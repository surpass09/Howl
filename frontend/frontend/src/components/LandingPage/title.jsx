import React, { useState } from 'react';
import './title.css';

// Import all banner images
import photo1 from '../Photos/friends.jpeg';
import photo2 from '../Photos/friends2.jpeg';
import photo3 from '../Photos/uw_sign.jpeg';
import asianFriends from '../Photos/asian_friends.jpeg';
import asianGirls from '../Photos/asian_girls.jpeg';
import friendGroup2 from '../Photos/friend_group2.jpeg';
import gayFriends from '../Photos/gay.jpeg';
import girlFriends from '../Photos/girl_friends.jpeg';

// Import FormPage Component
import FormPage from '../Form/form.jsx'; // Make sure to adjust the path

function Title() {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  const handleButtonClick = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  const handleCloseModal = () => {
    setShowForm(false); // Close the modal when clicking outside or close button
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="banner-container">
        <div className="banner-content">
          <div className="banner-images">
            <img src={photo1} alt="Friends" className="banner-image" />
            <img src={photo2} alt="More Friends" className="banner-image" />
            <img src={photo3} alt="UW Sign" className="banner-image" />
            <img src={asianFriends} alt="Asian Friends" className="banner-image" />
            <img src={asianGirls} alt="Asian Girls" className="banner-image" />
            <img src={friendGroup2} alt="Friend Group 2" className="banner-image" />
            <img src={gayFriends} alt="Gay Friends" className="banner-image" />
            <img src={girlFriends} alt="Girl Friends" className="banner-image" />
          </div>
        </div>
      </div>

      {/* Landing Section */}
      <div className="landing-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Howl!</h1>
            <p>Find Friends around the University of Washington!</p>
            <button className="cta-btn" onClick={handleButtonClick}>Get Started</button>
          </div>
        </section>

        {/* Modal for Profile Form */}
        {showForm && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={handleCloseModal}>X</button>
              <FormPage closeForm={handleCloseModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Title;
