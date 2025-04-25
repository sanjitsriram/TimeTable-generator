from app.parser import parse_input
from app.solver import solve

def generate_timetable(data):
    teachers, departments, courses, classrooms, class_timings = parse_input(data)
    return solve(teachers, departments, courses, classrooms, class_timings)
