import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './adddepartments.css';

const DepartmentForm = () => {
  const [deptName, setDeptName] = useState('');
  const [degree, setDegree] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const storedDepartments = JSON.parse(localStorage.getItem('departments')) || [];
    setDepartments(storedDepartments);
  }, []);

  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDepartment = {
      deptName,
      degree,
      academicYear,
      semester,
    };

    const updatedDepartments = [...departments, newDepartment];
    setDepartments(updatedDepartments);

    setDeptName('');
    setDegree('');
    setAcademicYear('');
    setSemester('');
  };

  const handleDelete = (index) => {
    const updatedDepartments = [...departments];
    updatedDepartments.splice(index, 1);
    setDepartments(updatedDepartments);
  };

  return (
    <div className="page-wrapper">
      <Sidebar />

      <div className="form-content-area">
        <h2 className="dept-title">Add Departments</h2>

        <form className="dept-form" onSubmit={handleSubmit}>
          <div className="dept-left">
            <div className="dept-field">
              <label htmlFor="deptName">Department Name</label>
              <input
                type="text"
                id="deptName"
                value={deptName}
                onChange={(e) => setDeptName(e.target.value)}
              />
            </div>

            <div className="dept-field">
              <label htmlFor="degree">Degree</label>
              <input
                type="text"
                id="degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>

            <div className="dept-field">
              <label htmlFor="academicYear">Academic Year</label>
              <input
                type="text"
                id="academicYear"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
              />
            </div>

            <div className="dept-field">
              <label htmlFor="semester">Semester (Even/Odd)</label>
              <input
                type="text"
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
            </div>

            <div className="dept-action">
              <div className="dept-plus">
                <i className="bi bi-plus"></i>
              </div>
              <button type="submit" className="dept-button">
                Add Department
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="teacher-output-area">
        <h2 className="form-heading">Departments List</h2>
        {departments.map((dept, index) => (
          <div className="teacher-card" key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p><strong>Department:</strong> {dept.deptName}</p>
                <p><strong>Degree:</strong> {dept.degree}</p>
                <p><strong>Academic Year:</strong> {dept.academicYear}</p>
                <p><strong>Semester:</strong> {dept.semester}</p>
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
        ))}
      </div>
    </div>
  );
};

export default DepartmentForm;
