# app/__init__.py

from .parser import parse_input
from .solver import solve
from .timetable_generator import generate_timetable
from .constraints import no_teacher_clash, no_room_clash, assign_course_duration
from .models import Teacher, Course, Classroom, Department, ClassTimings
