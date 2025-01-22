// Navbar.js
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './NavBar.css'; // Import CSS for styling
import Messages from '../Messages/messages.jsx'

const Navbar = () => {

    const [PopupOpen, setPopupOpen] = useState(false)



    const togglePopup = () => {
        setPopupOpen(!PopupOpen)
    }



    return (
        <nav className="navbar">
            <div className="navbar-logo">PawSocial</div>
                <ul className="navbar-links">
                <li>
                    <Link to="/home" className="icon-link">🏡</Link> {/* Home link */}
                </li>
                <li>
                    {/* Paw icon, click to navigate to /paw */}
                    <Link to="/paw" className="icon-link">🐾</Link> 
                </li>
                <li>
                    <div to="#chat" className="icon-link" onClick={togglePopup}>💬</div> {/* Chat link */}
                </li>
                </ul>
                <div className="navbar-search">
                <input type="text" placeholder="Search..." />
                <button>Search</button>
            </div>

            {PopupOpen && (
                <Messages />
            )}

        </nav>
    );
    };

export default Navbar;
