import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/LandingPage/title.jsx'; // Replace with your actual components
import Form from '/Users/suryapasupuleti/Documents/coding/Howl/frontend/frontend/src/components/Form/form.jsx'; 
import Profile from '../src/components/Profile/profile.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/success" element={<Profile />} /> {/* Success page route */}
      </Routes>
    </Router>
  );
}

export default App;