import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRecommendations } from './healthRecommendations'; // Import getRecommendations function
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Recommendations.css';

const Recommendations = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [recommendations, setRecommendations] = useState([]);
    const [message, setMessage] = useState(''); // Default message state
    const [recommend, setRecommend] = useState(''); // State for doctor recommendation

    useEffect(() => {
        const { name, message: passedMessage, recommendations: passedRecommendations, severity } = location.state || {};
        
        if (passedMessage) {
            setMessage(passedMessage);
        } else {
            setMessage('No message available.');
        }

        if (passedRecommendations && passedRecommendations.length > 0) {
            setRecommendations(passedRecommendations);
        } else if (name) {
            const fetchedRecommendations = getRecommendations(name.toLowerCase());
            setRecommendations(fetchedRecommendations);
            
            if (fetchedRecommendations.length > 0) {
                setMessage('Recommendations found!');
            } else {
                setMessage('No recommendations available for this symptom.');
            }
        } else {
            setMessage('No symptom data provided.');
        }

        if (severity > 7) {
            setRecommend('Severity is high. We recommend you visit a doctor.');
        } else {
            setRecommend('');
        }
    }, [location.state]);

    const handleGoBack = () => {
        navigate('/logger');
    };

    return (
        <div className="container">
            <NavBar />
            <div className="card mt-4 p-4 shadow-lg">
                {message && <p className="alert alert-info text-center">{message}</p>}
                <h2 className="text-center">Health Recommendations</h2>
                
                {recommendations.length > 0 ? (
                    <ul className="list-group mt-3">
                        {recommendations.map((tip, index) => (
                            <li key={index} className="list-group-item">{tip}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-danger text-center mt-3">No recommendations available.</p>
                )}

                {recommend && <p className="alert alert-warning text-center mt-3">{recommend}</p>}

                <button className="btn btn-primary w-100 mt-3" onClick={handleGoBack}>Go Back to Logger</button>
            </div>
        </div>
    );
};

export default Recommendations;

// Signup Component with Bootstrap

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://patient-symptom-tracker-production.up.railway.app/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                const loginResponse = await fetch('https://patient-symptom-tracker-production.up.railway.app/login/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                if (loginResponse.ok) {
                    const loginData = await loginResponse.json();
                    localStorage.setItem('access_token', loginData.access_token);
                    localStorage.setItem('user_id', loginData.user_id);
                    alert('Signup successful! You are now logged in.');
                    setName('');
                    setEmail('');
                    setPassword('');
                    navigate('/logger');
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
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <input className="form-control mb-3" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <input className="form-control mb-3" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                {error && <p className="text-danger text-center mt-3">{error}</p>}
                <p className="text-center mt-3">Already have an account? <a href="/">Login</a></p>
            </div>
        </div>
    );
};

export default Signup;
