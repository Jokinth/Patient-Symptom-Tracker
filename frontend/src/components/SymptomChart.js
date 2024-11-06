
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './SymptomChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SymptomChart = ({ symptoms }) => {
    const [symptomsData, setSymptomsData] = useState([]);

    useEffect(() => {
        setSymptomsData(symptoms); // Set symptoms from props
    }, [symptoms]);

    const chartData = {
        labels: symptomsData.map((_, index) => index + 1), // Use index as label
        datasets: [
            {
                label: 'Severity',
                data: symptomsData.map(symptom => symptom.severity),
                backgroundColor: 'rgba(88, 156, 207, 0.7)',
                borderColor: 'rgba(88, 156, 207, 1)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Symptom Index',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                    color: '#444',
                },
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                    minRotation: 0,
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Severity',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                    color: '#444',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Symptom Severity Over Time',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                color: '#444',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const symptom = symptomsData[context.dataIndex];
                        return `Date: ${symptom.date}, Symptom: ${symptom.name}, Severity: ${symptom.severity}`;
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default SymptomChart;
