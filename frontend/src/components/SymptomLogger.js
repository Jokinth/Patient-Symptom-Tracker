import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // Use the correct import
import { getRecommendations } from './healthRecommendations';
import NavBar from './NavBar';
import './SymptomLogger.css';

const SymptomLogger = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [severity, setSeverity] = useState(1);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // State for handling loading
    const [error, setError] = useState(''); // State for handling error

    const handleLogSymptom = async (e) => {
        e.preventDefault();

        // Retrieve the access token from localStorage
        const token = localStorage.getItem("access_token");

        if (!token) {
            setError('Please log in first.');
            setMessage(''); // Clear success message on error
            return;
        }

        // Decode the token to get user_id
        let userId = '';
        try {
            const decodedToken = jwtDecode(token); // Decode the token
            userId = decodedToken.user_id; // Extract user_id from decoded token
        } catch (error) {
            setError('Failed to decode the token.');
            setMessage(''); // Clear success message on error
            return;
        }


        // Prepare the symptom data
        const symptomData = {
            name: name,        // Ensure name is not empty
            severity: severity, // Ensure severity is a number (1-10)
            user_id: userId,   // Add user_id from the decoded token
        };

        setLoading(true); // Set loading to true before making the request

        try {
            const response = await fetch('http://localhost:8000/symptoms/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: JSON.stringify(symptomData), // Send symptom name, severity, and user_id to the backend
            });

            if (response.ok) {
                const recommendations = getRecommendations(name.toLowerCase()); // Get recommendations for the logged symptom

                // Set success message
                setMessage('Symptom logged successfully!');
                setError(''); // Clear any error messages
                
                // Navigate to recommendations page with state
                navigate('/recommendations', {
                    state: { recommendations, message: 'Symptom logged successfully!' ,severity},
                });
                
                // Clear inputs after successful submission
                setName('');
                setSeverity(1);
            } else {
                setError('Failed to log symptom. Please try again.');
                setMessage(''); // Clear success message on error
            }
        } catch (error) {
            setError('An error occurred while logging the symptom.');
            setMessage(''); // Clear success message on error
        } finally {
            setLoading(false); // Reset loading state after request is complete
        }
    };

    return (
        <div>
            <NavBar />
            <h2>Log Your Symptoms</h2>
            <form onSubmit={handleLogSymptom}>
                <input
                    type="text"
                    placeholder="Symptom Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label htmlFor="severity">Severity (1-10): {severity}</label>
                <input
                    type="range"
                    id="severity"
                    min="1"
                    max="10"
                    value={severity}
                    onChange={(e) => setSeverity(Number(e.target.value))}
                />
                <button type="submit" disabled={loading}>Log Symptom</button>
            </form>

            {loading && <p>Logging your symptom...</p>}
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SymptomLogger;
