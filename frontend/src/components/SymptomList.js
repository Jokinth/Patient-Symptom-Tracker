import React, { useEffect, useState } from 'react';
import { getSymptoms } from '../api';
import NavBar from './NavBar';
import SymptomChart from './SymptomChart';
import './SymptomList.css';

const SymptomList = () => {
    const [symptoms, setSymptoms] = useState([]);

    useEffect(() => {
        const fetchSymptoms = async () => {
            // Retrieve the token from local storage
            const token = localStorage.getItem("access_token");

            if (!token) {
                console.error("User is not authenticated. Please log in.");
                return;
            }

            try {
                const response = await getSymptoms(token); // Pass token to the API function
                setSymptoms(response.data);
            } catch (error) {
                console.error("Failed to fetch symptoms:", error);
            }
        };

        fetchSymptoms();
    }, []);

    return (
        <div className="symptom-list-container">
            <NavBar />
            <div className="symptom-chart-container">
                <h3 className="info-header"><u>Hover to know the details</u></h3>
                <SymptomChart symptoms={symptoms} />
            </div>
        </div>
    );
};

export default SymptomList;
