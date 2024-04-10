import React from 'react';
// import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import "../styles/Moodstyles.css";


function LandingPage() {
  const navigate = useNavigate();

  const mcq = () => {
    navigate('/Questionnaire');
  };
  return (
    <div className="landing-page">
      <h1>Welcome to Mood Maestro!</h1>
      <button onClick={() => mcq()}>Get Started</button>
      </div>
  );
}

export default LandingPage;