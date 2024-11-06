import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getRecommendations } from './healthRecommendations'; // Import getRecommendations function
import NavBar from './NavBar';
import './Recommendations.css';

const Recommendations = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [recommendations, setRecommendations] = useState([]);
    const [message, setMessage] = useState(''); // Default message state
    const [recommend, setRecommend] = useState(''); // State for doctor recommendation

    useEffect(() => {
        // Check if state is passed from the previous page
        const { name, message: passedMessage, recommendations: passedRecommendations, severity } = location.state || {};
        
        if (passedMessage) {
            setMessage(passedMessage); // If message is passed, set it
        } else {
            setMessage('No message available.'); // Default message
        }

        if (passedRecommendations && passedRecommendations.length > 0) {
            setRecommendations(passedRecommendations); // Set recommendations if passed
        } else if (name) {
            const fetchedRecommendations = getRecommendations(name.toLowerCase());
            setRecommendations(fetchedRecommendations); // Otherwise fetch recommendations based on symptom name
            
            if (fetchedRecommendations.length > 0) {
                setMessage('Recommendations found!'); // Update message if recommendations are available
            } else {
                setMessage('No recommendations available for this symptom.');
            }
        } else {
            setMessage('No symptom data provided.'); // Handle missing symptom name
        }

        // Check if severity is high, and add "Go to doctor" recommendation
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
        <div className="recommendations-container">
            <NavBar />
            <div className="content">
                {message && <p className="message">{message}</p>} {/* Display the message */}
                <h2 className="header">Health Recommendations</h2>
                
                {recommendations.length > 0 ? (
                    <ul className="recommendation-list">
                        {recommendations.map((tip, index) => (
                            <li key={index} className="recommendation-item">* {tip}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-recommendations">No recommendations available.</p>
                )}

                {/* Display the "Go to doctor" recommendation if severity is high */}
                {recommend && <p className="doctor-recommendation">{recommend}</p>}

                <button className="go-back-button" onClick={handleGoBack}>Go Back to Logger</button>
            </div>
        </div>
    );
};

export default Recommendations;
