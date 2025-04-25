import React from 'react';
import { useNavigate } from 'react-router-dom';
import './welcomepage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/add-teachers'); // Navigates to AddTeachers page
  };

  return (
    <div className="welcome-container">
      {/* Single Combined Header Image */}
      <div className="header-image-wrapper">
        <img src="/logo/finalimg.png" alt="Solamalai Full Header" className="header-image" />
      </div>

      {/* Welcome Text and Button */}
      <div className="content">
        <h1 className="welcome-text">Welcome !</h1>
        <h2 className="generator-text">Timetable Generator</h2>
        <button className="start-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;




















// first we are going to have 4 things that is "teacher, classroom, courses, classtimings' and let us take an example for teacher we are going to have teacher id, name, department ,we are going to have totally 6 teachers ,in classroom we are going to have id, name , capacity and in courses we are going to have id ,name , teacher name ,weekly hours ,semester and in classtimings we are going to  have no of periods per day,college timings and how many working days and tea break and lunch timings