
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getRecommendations } from './healthRecommendations';
import NavBar from './NavBar';
import './SymptomLogger.css'; 

const SymptomLogger = () => {
    const navigate = useNavigate(); 
    const [name, setName] = useState('');
    const [severity, setSeverity] = useState(1);
    const [message, setMessage] = useState('');

    const handleLogSymptom = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/symptoms/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, severity }),
        });

        if (response.ok) {
            const recommendations = getRecommendations(name.toLowerCase()); // Get recommendations for the logged symptom
            navigate('/recommendations', {
                state: { recommendations, message: 'Symptom logged successfully!' },
            });
        } else {
            setMessage('Failed to log symptom');
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
                <button type="submit">Log Symptom</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SymptomLogger;
