import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // New state for loading
    const [error, setError] = useState(''); // To store any error message
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(''); // Reset any previous error

        try {
            // Send request to the signup endpoint
            const response = await fetch('https://patient-symptom-tracker-production.up.railway.app/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                
                // After successful signup, automatically log the user in
                const loginResponse = await fetch('https://patient-symptom-tracker-production.up.railway.app/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (loginResponse.ok) {
                    const loginData = await loginResponse.json();
                    // Save the token in localStorage
                    localStorage.setItem('access_token', loginData.access_token);
                    localStorage.setItem('user_id', loginData.user_id); // Optionally store user_id as well
                    alert('Signup successful! You are now logged in.');
                    setName(''); // Clear the name input
                    setEmail(''); // Clear the email input
                    setPassword(''); // Clear the password input
                    navigate('/logger'); // Navigate to the symptom logger page
                } else {
                    setError('Login failed after signup. Please try again.');
                }
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Signup failed: The email may already be in use.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>} {/* Display error messages */}

            <p>Already have an account? <a href="/">Login</a></p>
        </div>
    );
};

export default Signup;
