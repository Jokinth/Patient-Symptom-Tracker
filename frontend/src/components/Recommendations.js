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
                {message && <p className="alert alert-info">{message}</p>}
                <h2 className="text-center">Health Recommendations</h2>
                
                {recommendations.length > 0 ? (
                    <ul className="list-group mt-3">
                        {recommendations.map((tip, index) => (
                            <li key={index} className="list-group-item">* {tip}</li>
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
