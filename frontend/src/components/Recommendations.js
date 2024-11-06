
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './Recommendations.css';

const Recommendations = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { recommendations, message } = location.state || { recommendations: [], message: '' };

    const handleGoBack = () => {
        navigate('/logger');
    };

    return (
        <div className="recommendations-container">
            <NavBar />
            <div className="content">
                {message && <p className="message">{message}</p>}
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
                <button className="go-back-button" onClick={handleGoBack}>Go Back to Logger</button>
            </div>
        </div>
    );
};

export default Recommendations;
