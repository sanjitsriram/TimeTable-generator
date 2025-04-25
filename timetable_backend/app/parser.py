import logging
from app.models import Teacher, Course, Classroom, Department, ClassTimings

# ─── logging config ───────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

# ──────────────────────────────────────────────────────────────────────────────
def _extract_teacher_id(course_dict: dict) -> int:
    """
    Allow course objects to provide the teacher link as either
    • nested 'teacher': { 'id': ... }  (current frontend)
    • flat  'teacherId': "42"          (legacy / alt frontend)

    Raises KeyError if neither is present.
    """
    # preferred: nested
    teacher_info = course_dict.get("teacher")
    if teacher_info and "id" in teacher_info:
        return int(teacher_info["id"])

    # fallback: flat
    if "teacherId" in course_dict:
        return int(course_dict["teacherId"])

    raise KeyError("Course missing teacher reference: expected 'teacher.id' or 'teacherId'")


def parse_input(data: dict):
    """
    Convert the incoming JSON payload into model objects ready for timetable generation.
    Returns: (teachers, departments, courses, classrooms, class_timings)
    """
    if not data:
        raise ValueError("No data provided for timetable generation.")

    logging.info("Starting data parsing…")

    # ─── classrooms ───────────────────────────────────────────────────────────
    classrooms = [
        Classroom(
            id=c.get("classroomId", c.get("id")),
            name=c["classroomName"],
            capacity=int(c["capacity"]),
        )
        for c in data.get("classroomData", [])
    ]
    logging.debug("Classrooms parsed: %s", classrooms)

    # ─── teachers ─────────────────────────────────────────────────────────────
    teachers = [
        Teacher(id=int(t["id"]), name=t["name"], department=t["department"])
        for t in data.get("teacherData", [])
    ]
    logging.debug("Teachers parsed: %s", teachers)

    # ─── courses ──────────────────────────────────────────────────────────────
    courses = []
    for c in data.get("courseData", []):
        try:
            tid = _extract_teacher_id(c)
        except KeyError as exc:
            logging.error("Skipping course %s due to: %s", c.get("id", c), exc)
            continue  # skip courses without a teacher link

        course = Course(
            id=c["id"],
            name=c["name"],
            duration=int(c["duration"]),
            teacher_id=tid,
            term=c.get("term"),
        )
        courses.append(course)

    logging.debug("Courses parsed: %s", courses)

    # ─── departments ──────────────────────────────────────────────────────────
    departments = [
        Department(
            name=d["name"],
            courses=[
                Course(
                    id=cd["id"],
                    name=cd["name"],
                    duration=int(cd["duration"]),
                    teacher_id=_extract_teacher_id(cd),
                    term=cd.get("term"),
                )
                for cd in d.get("courses", [])
            ],
        )
        for d in data.get("departmentData", [])
    ]
    logging.debug("Departments parsed: %s", departments)

    # ─── class timings ────────────────────────────────────────────────────────
    class_timings = []
    for timing in data.get("classTimings", []):
        # working days
        if timing.get("workingDays"):
            working_days = timing["workingDays"]
            logging.debug("Using provided workingDays: %s", working_days)
        else:
            try:
                days_count = int(timing.get("daysOfWeek", 6))
                if days_count > len(ALL_DAYS):
                    logging.warning("daysOfWeek exceeds 6; using all days.")
                    days_count = len(ALL_DAYS)
            except ValueError:
                logging.error("Invalid daysOfWeek value %s; defaulting to 6.", timing.get("daysOfWeek"))
                days_count = 6

            working_days = ALL_DAYS[:days_count]
            logging.debug("Derived workingDays: %s", working_days)

        ct = ClassTimings(
            periods_per_day=int(timing["noOfPeriods"]),
            working_days=working_days,
            start_time=timing["timing"].split(" - ")[0],
            end_time=timing["timing"].split(" - ")[1],
            weekly_hours=int(timing.get("weeklyHours", 0)),
            tea_breaks=[
                {"start": tb.split(" - ")[0], "end": tb.split(" - ")[1]}
                for tb in [timing["teaBreak"]]
            ] if timing.get("teaBreak") else [],
            lunch_breaks=[
                {"start": lb.split(" - ")[0], "end": lb.split(" - ")[1]}
                for lb in [timing["lunchBreak"]]
            ] if timing.get("lunchBreak") else [],
        )
        class_timings.append(ct)

    logging.debug("Class timings parsed: %s", class_timings)
    logging.info("Data parsing completed successfully.")

    return teachers, departments, courses, classrooms, class_timings
