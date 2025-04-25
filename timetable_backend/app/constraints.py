from ortools.sat.python import cp_model

# ✅ Ensure no teacher is scheduled for multiple classes at the same time
def no_teacher_clash(model, variables_by_teacher):
    print("🔍 Applying teacher clash constraints...")
    for teacher_id, time_slots in variables_by_teacher.items():
        print(f"📦 Teacher {teacher_id}: {time_slots}")
        for time_key, vars_at_time in time_slots.items():
            if len(vars_at_time) > 1:
                model.Add(sum(vars_at_time) <= 1)

# ✅ Ensure no classroom is used for multiple classes at the same time
def no_room_clash(model, variables_by_room):
    print("🔍 Applying room clash constraints...")
    for room_id, time_slots in variables_by_room.items():
        print(f"📦 Room {room_id}: {time_slots}")
        for time_key, vars_at_time in time_slots.items():
            if len(vars_at_time) > 1:
                model.Add(sum(vars_at_time) <= 1)

# ✅ Enforce course duration across the week
def assign_course_duration(model, course_vars, duration):
    print(f"⏱️ Assigning duration: {duration} to {len(course_vars)} time slots")
    model.Add(sum(course_vars) == int(duration))

# ✅ Assign classrooms to courses that don't have one assigned
def assign_classrooms_to_courses(courses, classrooms):
    if not classrooms:
        raise ValueError("❌ No classrooms available to assign.")
    print("🏫 Assigning classrooms to courses...")
    for index, course in enumerate(courses):
        if 'classroomId' not in course or not course['classroomId']:
            assigned_classroom = classrooms[index % len(classrooms)]
            print(f"  - Assigned Room {assigned_classroom['id']} to Course {course['name']}")
            course['classroomId'] = assigned_classroom['id']  # Corrected assignment to course

# ✅ Main timetable solver function
def solve_timetable(teachers, classrooms, courses, class_timings):
    print("📚 Starting to create course assignments...")

    print(f"👩‍🏫 Teachers ({len(teachers)}): {[t['name'] for t in teachers]}")
    print(f"🏫 Rooms ({len(classrooms)}): {[c['name'] for c in classrooms]}")
    assign_classrooms_to_courses(courses, classrooms)

    model = cp_model.CpModel()
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    periods = int(class_timings.get('noOfPeriods', 7))

    course_vars = {}
    variables_by_teacher = {}
    variables_by_room = {}

    try:
        # Create variables for each course
        for course in courses:
            course_id = course['id']
            teacher_id = course.get('teacherId')
            room_id = course.get('classroomId')  # classroomId is already assigned as an integer
            course_vars[course_id] = []

            for day_index in range(len(days)):
                for period in range(periods):
                    var = model.NewBoolVar(f"{course_id}_d{day_index}_p{period}")
                    course_vars[course_id].append(var)
                    time_key = f"{day_index}_{period}"

                    # Make sure variables_by_teacher is being treated as a dictionary
                    if teacher_id:
                        if teacher_id not in variables_by_teacher:
                            variables_by_teacher[teacher_id] = {}
                        if time_key not in variables_by_teacher[teacher_id]:
                            variables_by_teacher[teacher_id][time_key] = []
                        variables_by_teacher[teacher_id][time_key].append(var)

                    # Make sure variables_by_room is being treated as a dictionary
                    if room_id:
                        if room_id not in variables_by_room:
                            variables_by_room[room_id] = {}
                        if time_key not in variables_by_room[room_id]:
                            variables_by_room[room_id][time_key] = []
                        variables_by_room[room_id][time_key].append(var)

        print("✅ Course variables and constraint mappings created successfully.")
        print("📦 Sample variables_by_teacher keys:", list(variables_by_teacher.keys())[:3])
        print("📦 Sample variables_by_room keys:", list(variables_by_room.keys())[:3])

        # Assign course durations
        print("⏱️ Assigning course durations:")
        for course in courses:
            print(f"  - {course['name']} → {course['duration']} periods")
            assign_course_duration(model, course_vars[course['id']], course['duration'])

        # Apply constraints
        print("🚫 Applying constraints...")
        no_teacher_clash(model, variables_by_teacher)
        no_room_clash(model, variables_by_room)

        # Apply max periods constraint per day (maximum 7 periods per day)
        print("🚫 Applying max periods constraint (7 periods per day)...")
        for day_index in range(len(days)):
            model.Add(sum(course_vars[course['id']][day_index * periods + period] for course in courses for period in range(periods)) <= 7)

        print("🧠 Solving model...")
        solver = cp_model.CpSolver()
        status = solver.Solve(model)

        timetable = []
        if status in [cp_model.OPTIMAL, cp_model.FEASIBLE]:
            print("✅ Feasible solution found.")
            for course in courses:
                course_id = course['id']
                course_name = course['name']
                teacher_id = course['teacherId']
                classroom_id = course['classroomId']

                teacher_name = next((t['name'] for t in teachers if t['id'] == teacher_id), 'Unknown')
                classroom_name = next((c['name'] for c in classrooms if c['id'] == classroom_id), 'Unknown')

                for day_index, day in enumerate(days):
                    for period in range(periods):
                        idx = day_index * periods + period
                        if solver.Value(course_vars[course_id][idx]):
                            timetable.append({
                                "course": course_name,
                                "teacher": teacher_name,
                                "day": day,
                                "period": period + 1,
                                "classroom": classroom_name
                            })
        else:
            print("❌ No feasible solution found.")
            print("❗ Try adjusting course durations, periods, or constraints.")

        return timetable

    except Exception as e:
        print("❌ Error applying constraints:", e)
        return []

# Example usage:
