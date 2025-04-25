import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './addclassrooms.css';

const AddClassroom = () => {
  const [classroomId, setClassroomId] = useState('');
  const [classroomName, setClassroomName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const storedClassrooms = JSON.parse(localStorage.getItem('classrooms')) || [];
    setClassrooms(storedClassrooms);
  }, []);

  useEffect(() => {
    if (classrooms.length > 0) {
      localStorage.setItem('classrooms', JSON.stringify(classrooms));
    }
  }, [classrooms]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClassroom = {
      classroomId,
      classroomName,
      capacity,
    };

    const updatedClassrooms = [...classrooms, newClassroom];
    setClassrooms(updatedClassrooms);

    setClassroomId('');
    setClassroomName('');
    setCapacity('');
  };

  const handleDelete = (index) => {
    const updatedClassrooms = [...classrooms];
    updatedClassrooms.splice(index, 1);
  
    // Update state
    setClassrooms(updatedClassrooms);
  
    // Update localStorage
    localStorage.setItem('classrooms', JSON.stringify(updatedClassrooms));
  };
  

  return (
    <div className="page-wrapper">
      <Sidebar />

      <div className="form-content-area">
        <h2 className="dept-title">Add Classrooms</h2>

        <form className="dept-form" onSubmit={handleSubmit}>
          <div className="dept-left">
            <div className="dept-field">
              <label htmlFor="classroomId">Classroom ID</label>
              <input
                type="text"
                id="classroomId"
                value={classroomId}
                onChange={(e) => setClassroomId(e.target.value)}
              />
            </div>

            <div className="dept-field">
              <label htmlFor="classroomName">Classroom Name</label>
              <input
                type="text"
                id="classroomName"
                value={classroomName}
                onChange={(e) => setClassroomName(e.target.value)}
              />
            </div>

            <div className="dept-field">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>

            <div className="dept-action">
              <div className="dept-plus">
                <i className="bi bi-plus"></i>
              </div>
              <button type="submit" className="dept-button">
                Add Classroom
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Output Section */}
      <div className="teacher-output-area">
        <h2 className="form-heading">Classrooms List</h2>
        {classrooms.map((cls, index) => (
          <div className="teacher-card" key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p><strong>Classroom ID:</strong> {cls.classroomId}</p>
                <p><strong>Name:</strong> {cls.classroomName}</p>
                <p><strong>Capacity:</strong> {cls.capacity}</p>
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

export default AddClassroom;
