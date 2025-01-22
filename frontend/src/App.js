import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/LandingPage/title.jsx'; // Replace with your actual components
import Form from './components/Form/form.jsx'; 
import Profile from './components/Profile/profile.jsx'
import LoginPage from './components/Login/Login_Form/LoginPage.jsx'
import Paw from './components/PawPage/Paw.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<Profile />} /> {/* Success page route */}
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/paw" element={<Paw />}></Route>
        <Route path="home" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;