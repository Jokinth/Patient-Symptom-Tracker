import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State to handle errors
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            // Send login request to backend
            const response = await fetch('http://localhost:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Check if response is successful
            if (response.ok) {
                const data = await response.json(); // Get the access token from response
                localStorage.setItem('access_token', data.access_token); // Store token in localStorage

                // Optionally, fetch user data or symptoms here if needed
                // For example, fetching symptoms:
                // const userResponse = await fetch('http://localhost:8000/symptoms/', {
                //     headers: {
                //         'Authorization': `Bearer ${data.access_token}`, // Include token in the request
                //     },
                // });

                // Redirect user to the symptom logger page after successful login
                navigate('/logger');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>

            {/* Display error message if any */}
            {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    );
};

export default Login;
