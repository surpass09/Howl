import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/LandingPage/title.jsx'; // Replace with your actual components
import Profile from '/Users/suryapasupuleti/Documents/coding/Howl/frontend/frontend/src/components/LandingPage/Form/form.jsx'; // Replace with your actual components

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
