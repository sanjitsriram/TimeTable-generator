import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './addteacher.css';

const AddTeachers = () => {
  const [teacherId, setTeacherId] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [department, setDepartment] = useState('');
  const [teachers, setTeachers] = useState([]);

  // Load teachers from localStorage on component mount
  useEffect(() => {
    const storedTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
    setTeachers(storedTeachers);
  }, []);

  // Save teachers to localStorage whenever the teachers list changes
  useEffect(() => {
    if (teachers.length > 0) {
      localStorage.setItem('teachers', JSON.stringify(teachers));
    }
  }, [teachers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: teacherId,
      name: teacherName,
      department: department,
    };
    const updatedTeachers = [...teachers, newTeacher];
    setTeachers(updatedTeachers);
    setTeacherId('');
    setTeacherName('');
    setDepartment('');
  };

  const handleDelete = (index) => {
    const updatedTeachers = [...teachers];
    updatedTeachers.splice(index, 1);
    
    // Update state
    setTeachers(updatedTeachers);
  
    // Update local storage
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers));
  };
  

  return (
    <div className="page-wrapper">
      <Sidebar />

      <div className="form-content-area">
        <h2 className="form-heading">Add Teachers</h2>
        <form className="teacher-form" onSubmit={handleSubmit}>
          <label htmlFor="teacherId">Teacher Id</label>
          <input
            type="text"
            id="teacherId"
            name="teacherId"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          />

          <label htmlFor="teacherName">Teacher Name</label>
          <input
            type="text"
            id="teacherName"
            name="teacherName"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
          />

          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <div className="form-action-row">
            <div className="icon-wrapper">
              <i className="bi bi-plus"></i>
            </div>
            <button type="submit" className="submit-teacher-btn">
              Add Teacher
            </button>
          </div>
        </form>
      </div>

      <div className="teacher-output-area">
        <h2 className="form-heading">Teachers List</h2>
        {teachers.length > 0 ? (
          teachers.map((teacher, index) => (
            <div className="teacher-card" key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p><strong>ID:</strong> {teacher.id}</p>
                  <p><strong>Name:</strong> {teacher.name}</p>
                  <p><strong>Department:</strong> {teacher.department}</p>
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
          <p>No teachers available. Please add teachers.</p>
        )}
      </div>
    </div>
  );
};

export default AddTeachers;
