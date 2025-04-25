import json
from ortools.sat.python import cp_model
from app.constraints import (
    no_teacher_clash,
    no_room_clash,
    assign_course_duration,
)

def solve(teachers, departments, courses, classrooms, class_timings):
    """Build and solve the timetable model; return a full 42‑slot timetable."""

    # ─── sanity checks ───────────────────────────────────────────────────────
    if not class_timings:
        print("❗ No class timings provided.")
        return None

    days    = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    periods = int(class_timings[0].periods_per_day)
    if periods <= 0:
        print(f"❗ Invalid periods per day: {periods}.")
        return None

    print(f"🗓️  Working days: {days}")
    print(f"⏰  Periods per day: {periods}")

    # ─── model / decision variables ──────────────────────────────────────────
    model = cp_model.CpModel()
    course_vars, by_teacher, by_room = {}, {}, {}

    for c in courses:
        course_vars[c.id] = []
        for d in range(len(days)):
            for p in range(periods):
                var = model.NewBoolVar(f"{c.id}_d{d}_p{p}")
                course_vars[c.id].append(var)
                key = f"{d}_{p}"

                if c.teacher_id:
                    by_teacher.setdefault(c.teacher_id, {}) \
                              .setdefault(key, []).append(var)
                if getattr(c, "room_id", None):
                    by_room.setdefault(c.room_id, {}) \
                           .setdefault(key, []).append(var)

    # ─── course length, clash constraints ────────────────────────────────────
    for c in courses:
        assign_course_duration(model, course_vars[c.id], int(c.duration))
    no_teacher_clash(model, by_teacher)
    no_room_clash(model,    by_room)

    # ─── per‑course daily cap (max 3 hrs of same subject in a day) ───────────
    MAX_PER_DAY = 3
    for c in courses:
        v = course_vars[c.id]
        for d in range(len(days)):
            model.Add(sum(v[d*periods:(d+1)*periods]) <= MAX_PER_DAY)

    # ─── every slot must be occupied by exactly one class ────────────────────
    for d in range(len(days)):
        for p in range(periods):
            model.AddExactlyOne(
                course_vars[c.id][d*periods + p] for c in courses
            )

    # ─── solve ───────────────────────────────────────────────────────────────
    solver = cp_model.CpSolver()
    status = solver.Solve(model)
    print("Solver status:", solver.StatusName(status))
    if status not in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        print("❌ No feasible timetable found.")
        return None

    # ─── build JSON‑ready output (42 entries) ────────────────────────────────
    timetable = []
    for c in courses:
        for d, day in enumerate(days):
            for p in range(periods):
                if solver.Value(course_vars[c.id][d*periods + p]):
                    timetable.append({
                        "course_code"  : c.id,          # e.g. "CS 3245"
                        "course_title" : c.name,
                        "teacher_id"   : c.teacher_id,
                        "teacher_name" : next((t.name for t in teachers
                                               if t.id == c.teacher_id), "Unknown"),
                        "day"          : day,
                        "period"       : p + 1,
                        "room_id"      : getattr(c, "room_id", None),
                    })

    # ─── sanity: ensure exactly 42 slots ─────────────────────────────────────
    total_expected = len(days) * periods      # 6 × 7 = 42
    if len(timetable) != total_expected:
        print(f"❌ Generated only {len(timetable)} of {total_expected} slots!")
        return None

    print("📅 Timetable generated successfully with 42 filled slots.")
    for e in timetable:
        print(f"{e['course_code']} | {e['teacher_name']} | {e['day']} P{e['period']}")

    return timetable
