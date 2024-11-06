
import React, { useEffect, useState } from 'react';
import { getSymptoms } from '../api';
import NavBar from './NavBar';
import SymptomChart from './SymptomChart';
import './SymptomList.css';

const SymptomList = () => {
    const [symptoms, setSymptoms] = useState([]);

    useEffect(() => {
        const fetchSymptoms = async () => {
            const response = await getSymptoms();
            setSymptoms(response.data);
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
