import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getRecommendations } from './healthRecommendations';
import NavBar from './NavBar';
import './SymptomLogger.css';

const SymptomLogger = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [severity, setSeverity] = useState(1);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogSymptom = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("access_token");

        if (!token) {
            setError('Please log in first.');
            setMessage('');
            return;
        }

        let userId = '';
        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.user_id;
        } catch (error) {
            setError('Failed to decode the token.');
            setMessage('');
            return;
        }

        const symptomData = {
            name: name,
            severity: severity,
            user_id: userId,
        };

        setLoading(true);

        try {
            const response = await fetch('https://patient-symptom-tracker-production.up.railway.app/symptoms/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(symptomData),
            });

            if (response.ok) {
                const recommendations = getRecommendations(name.toLowerCase());
                setMessage('Symptom logged successfully!');
                setError('');
                navigate('/recommendations', {
                    state: { recommendations, message: 'Symptom logged successfully!', severity },
                });
                setName('');
                setSeverity(1);
            } else {
                setError('Failed to log symptom. Please try again.');
                setMessage('');
            }
        } catch (error) {
            setError('An error occurred while logging the symptom.');
            setMessage('');
        } finally {
            setLoading(false);
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
