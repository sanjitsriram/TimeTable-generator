// ────────────────────────────────────────────────────────────
// src/pages/AddCourse.js
// ────────────────────────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './addcources.css';

const STORAGE_KEY_COURSES  = 'courses';
const STORAGE_KEY_TEACHERS = 'teachers';

const AddCourse = () => {
  /* ─── form state ─── */
  const [courseId,   setCourseId]   = useState('');
  const [courseName, setCourseName] = useState('');
  const [duration,   setDuration]   = useState('');
  const [teacherId,  setTeacherId]  = useState('');

  /* ─── lists ─── */
  const [courses,  setCourses]  = useState([]);
  const [teachers, setTeachers] = useState([]);

  /* block initial empty write */
  const hasLoadedFromStorage = useRef(false);

  /* 1️⃣  load once on mount */
  useEffect(() => {
    const storedCourses  = JSON.parse(localStorage.getItem(STORAGE_KEY_COURSES)  || '[]');
    const storedTeachers = JSON.parse(localStorage.getItem(STORAGE_KEY_TEACHERS) || '[]');

    if (storedCourses.length)  setCourses(storedCourses);
    if (storedTeachers.length) setTeachers(storedTeachers);

    hasLoadedFromStorage.current = true;
  }, []);

  /* 2️⃣  persist after every state change (skip first render) */
  useEffect(() => {
    if (hasLoadedFromStorage.current) {
      localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(courses));
    }
  }, [courses]);

  /* add course */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!courseId || !courseName || !duration || !teacherId) {
      alert('Please fill out all fields.');
      return;
    }

    if (courses.some(c => c.id === courseId.trim())) {
      alert('Course ID already exists.');
      return;
    }

    const teacherObj = teachers.find(t => t.id === teacherId) || null;

    const newCourse = {
      id:       courseId.trim(),
      name:     courseName.trim(),
      duration: duration.trim(),
      teacher:  teacherObj,
    };

    setCourses(prev => [...prev, newCourse]);       // auto‑persists

    /* reset form */
    setCourseId('');
    setCourseName('');
    setDuration('');
    setTeacherId('');
  };

  /* delete course */
  const handleDelete = (index) => {
    setCourses(prev => prev.filter((_, i) => i !== index));  // auto‑persists
  };

  /* ─── UI ─── */
  return (
    <div className="page-wrapper">
      <Sidebar />

      {/* ───────── Form Section ───────── */}
      <div className="form-content-area">
        <h2 className="dept-title">Add Course</h2>

        <form className="dept-form" onSubmit={handleSubmit}>
          <div className="dept-left">
            {/* Course ID */}
            <div className="dept-field">
              <label htmlFor="courseId">Course ID</label>
              <input
                type="text"
                id="courseId"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              />
            </div>

            {/* Course Name */}
            <div className="dept-field">
              <label htmlFor="courseName">Course Name</label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>

            {/* Duration */}
            <div className="dept-field">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            {/* Teacher selector */}
            <div className="dept-field">
              <label htmlFor="teacher">Teacher</label>
              <select
                id="teacher"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
              >
                <option value="">-- Select Teacher --</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div className="dept-action">
              <div className="dept-plus">
                <i className="bi bi-plus"></i>
              </div>
              <button type="submit" className="dept-button">
                Add Course
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ───────── Output Section ───────── */}
      <div className="teacher-output-area">
        <h2 className="form-heading">Courses List</h2>

        {courses.length ? (
          courses.map((course, index) => (
            <div className="teacher-card" key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p><strong>ID:</strong> {course.id}</p>
                  <p><strong>Name:</strong> {course.name}</p>
                  <p><strong>Duration:</strong> {course.duration}</p>
                  <p><strong>Teacher:</strong> {course.teacher?.name ?? '—'}</p>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc3545',
                    cursor: 'pointer',
                    fontSize: '18px',
                  }}
                  title="Delete"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No courses available. Please add courses.</p>
        )}
      </div>
    </div>
  );
};

export default AddCourse;
