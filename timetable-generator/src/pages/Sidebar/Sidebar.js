import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const isActive = (path) => window.location.pathname === path;

  const handleGenerateClick = async () => {
    const storedData = {
      classTimings: JSON.parse(localStorage.getItem('classTimings'))?.map((timing) => {
        const daysOfWeek = parseInt(timing.daysOfWeek, 10);
        const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return {
          ...timing,
          workingDays: allDays.slice(0, daysOfWeek),
        };
      }) || [],
      teacherData: JSON.parse(localStorage.getItem('teachers')) || [],
      departmentData:  [],
      classroomData: JSON.parse(localStorage.getItem('classrooms')) || [],
      courseData: JSON.parse(localStorage.getItem('courses')) || [],
    };
//  || JSON.parse(localStorage.getItem('departments'))
    console.log('📦 Data to send:', storedData);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/generate-timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storedData),
      });

      if (!res.ok) {
        const errText = await res.text();
        alert(`Backend error (${res.status}):\n${errText}`);
        return;
      }

      const json = await res.json();
      const timetable = Array.isArray(json) ? json : json.timetable;

      if (!Array.isArray(timetable) || !timetable.length) {
        alert('Backend returned an empty timetable.');
        return;
      }

      console.log('🗓 Timetable received:', timetable.length, 'sessions');

      sessionStorage.setItem('latestTimetable', JSON.stringify({ timetable }));
      navigate('/generate', { state: { timetable } });

    } catch (err) {
      console.error('Fetch error:', err);
      alert('Unable to reach backend. Ensure the Flask server is running.');
    }
  };

  return (
    <aside className="menu-sidebar">
      <div className="logo-section">
        <img src="/logo/book.png" alt="Logo" className="site-logo" />
        <div className="college-title">Solamalai College of Engineering</div>
      </div>

      <nav className="menu-links">
        {[
          { path: '/add-teachers', icon: 'bi-lock', label: 'Teachers' },
          { path: '/add-department', icon: 'bi-building', label: 'Departments' },
          { path: '/add-classrooms', icon: 'bi-door-open', label: 'Class Room' },
          { path: '/add-courses', icon: 'bi-journal-bookmark', label: 'Courses' },
          { path: '/add-timing', icon: 'bi-clock', label: 'Class Timing' },
        ].map(({ path, icon, label }) => (
          <div
            key={path}
            className={`menu-item ${isActive(path) ? 'active-link' : ''}`}
            onClick={() => navigate(path)}
          >
            <i className={`bi ${icon} menu-icon`}></i>
            <span>{label}</span>
          </div>
        ))}
      </nav>

      <div className="generate-btn-container">
        <button className="generate-btn" onClick={handleGenerateClick}>
          <i className="bi bi-play-circle menu-icon"></i> Generate
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
