import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS for styling
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const navigate = useNavigate();
    
    const [email, setEmail] = useState(''); // Change from username to email
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // New state for loading
    const [errorMessage, setErrorMessage] = useState(''); // To display any error messages

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks before making API call
        if (!email || !password) {
            setErrorMessage('Please fill in both fields');
            return;
        }

        setErrorMessage(''); // Reset error message if fields are filled
        setLoading(true); // Set loading state to true

        try {
            // Send login request to backend API
            const response = await fetch('http://127.0.0.1:8000/api/api/validate-user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email, // Send email instead of username
                    password: password,
                }),
            });

            setLoading(false); // Reset loading state after the request

            // Check if response is successful
            if (response.ok) {
                const data = await response.json();
                console.log(data);

                if (data.message === 'Login successful!') {
                    navigate('/profile'); // Navigate to profile page on success
                } else {
                    setErrorMessage(data.message); // Show error message if login fails
                }
            } else {
                setErrorMessage('Login Failed. Please try again.'); // Show error if API response is not OK
            }

        } catch (error) {
            console.log('Error:', error);
            setLoading(false); // Reset loading state on error
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    // Handle password changes
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Handle email changes (changed from username)
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className='login-page'>
            <h1>Login Page</h1>
            <p>Please enter your credentials to log in.</p>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input
                    type='email' // Use 'email' type for better validation
                    id='email'
                    value={email}
                    onChange={handleEmail} // Update handler for email field
                    placeholder='Enter email'
                    required
                />

                <label htmlFor='password'>Password</label>
                <input
                    type='password' // Changed to 'password' type
                    id='password'
                    value={password}
                    onChange={handlePassword}
                    placeholder='Enter password'
                    required
                />

                {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error messages */}

                <button type="submit" disabled={loading}>Login</button> {/* Disable the button while loading */}

                {loading && <div>Loading...</div>} {/* Show loading message */}
            </form>
        </div>
    );
}

export default LoginPage;
