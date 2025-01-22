import React from 'react';
import './profile.css'; // Import the updated CSS
import Navbar from '../Navbar/navbar.jsx';

function LandingPage() {
  return (
    <>
      <Navbar />
    <div className="landing-page">
      <div className="content">
        <h1 className="headline">Welcome Back!</h1>
        <p className="description">Let’s dive into something amazing together.</p>
        <button className="cta-button">Get Started</button>
      </div>

      {/* Background Shapes */}
      <div className="background-shapes">
        <div className="circle"></div>
        <div className="triangle"></div>
      </div>
    </div>
    </>
    
  );
}

export default LandingPage;
