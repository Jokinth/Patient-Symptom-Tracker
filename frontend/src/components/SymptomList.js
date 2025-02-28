import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSymptoms } from '../api';
import NavBar from './NavBar';
import SymptomChart from './SymptomChart';
import './SymptomList.css';

const SymptomList = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSymptoms = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                console.error("User is not authenticated. Redirecting to login.");
                navigate('/login');
                return;
            }

            try {
                const response = await getSymptoms(token);
                setSymptoms(response.data);
            } catch (error) {
                console.error("Failed to fetch symptoms:", error);
                setError("Failed to fetch symptoms. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSymptoms();
    }, [navigate]);

    if (loading) {
        return <p>Loading symptoms data...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="symptom-list-container">
            <NavBar />
            <div className="symptom-chart-container">
                <h3 className="info-header"><u>Hover to know the details</u></h3>
                {symptoms.length > 0 ? (
                    <SymptomChart symptoms={symptoms} />
                ) : (
                    <p className="no-data-message">No symptoms data available.</p>
                )}
            </div>
        </div>
    );
};

export default SymptomList;
