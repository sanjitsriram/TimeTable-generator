@echo off
echo Starting Timetable Generator Project...
echo.

REM Navigate to backend and run server
echo Starting backend...
cd /d Z:\projects\timetablegenerator\timetable_backend
start cmd /k "python main.py"

REM Navigate to frontend and run React app
echo Starting frontend...
cd /d Z:\projects\timetablegenerator\timetable-generator
start cmd /k "npm start"

echo All services started!
