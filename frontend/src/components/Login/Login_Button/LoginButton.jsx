import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 


function Login() {

    const navigate = useNavigate();

    const handleClick = (e) => {
        navigate('/login');
    };


    return (
        <div>
            <button className="login-button" onClick={handleClick}>
                Login
            </button>
        </div>
    )
}

export default Login;
