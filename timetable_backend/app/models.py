from dataclasses import dataclass
from typing import List

@dataclass
class Teacher:
    id: int
    name: str
    department: str

@dataclass
class Course:
    id: str
    name: str
    duration: int  # number of periods per week
    teacher_id: int  # teacherId field to store the teacher's ID
    term: str = None  # Optional term field

@dataclass
class Classroom:
    id: int
    name: str
    capacity: int

@dataclass
class Department:
    name: str
    courses: List[Course]

@dataclass
class ClassTimings:
    periods_per_day: int  # Number of periods per day
    working_days: List[str]  # Days of the week when classes are held (e.g., ["Monday", "Tuesday", "Wednesday"])
    start_time: str  # Class start time in HH:MM format
    end_time: str  # Class end time in HH:MM format
    weekly_hours: int  # Total hours of class per week (can be calculated if not provided)
    tea_breaks: List[dict]  # List of dictionaries representing tea breaks (start time, end time)
    lunch_breaks: List[dict]  # List of dictionaries representing lunch breaks (start time, end time)

# # Example data usage:
# teachers = [
#     Teacher(id=1, name="Mrs. M. Karthiyayini", department="Maths"),
#     Teacher(id=2, name="Mrs. K. Harini", department="CSE"),
#     Teacher(id=3, name="Mr. C. Praveen", department="CSE")
# ]

# courses = [
#     Course(id="101", name="Mathematics", duration=5, teacher_id=1),
#     Course(id="102", name="Programming", duration=4, teacher_id=2),
#     Course(id="103", name="Algorithms", duration=3, teacher_id=3)
# ]

# classrooms = [
#     Classroom(id=201, name="Room A", capacity=40),
#     Classroom(id=202, name="Room B", capacity=30)
# ]

# departments = [
#     Department(name="CSE", courses=[courses[1], courses[2]]),
#     Department(name="Maths", courses=[courses[0]])
# ]

# class_timings = [
#     ClassTimings(
#         periods_per_day=6,
#         working_days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
#         start_time="9:00",
#         end_time="3:00",
#         weekly_hours=30,
#         tea_breaks=[{"start": "10:30", "end": "10:50"}],
#         lunch_breaks=[{"start": "12:30", "end": "1:00"}]
#     )
# ]

# # The above data structures represent the data model that you can use to populate your timetable generation logic
