import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './SymptomChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SymptomChart = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [loading, setLoading] = useState(true); // New state for loading
    const [error, setError] = useState(null); // New state for error handling

    // Retrieve the token from localStorage
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                if (!token) {
                    throw new Error("User is not authenticated. Please log in.");
                }

                // Fetch symptoms for the logged-in user, passing token in the Authorization header
                const response = await fetch('https://patient-symptom-tracker-production.up.railway.app/symptoms/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setSymptoms(data); // Update the symptoms state with the fetched data
                } else {
                    throw new Error("Failed to fetch symptoms for user");
                }
            } catch (error) {
                setError(error.message); // Set the error state
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };

        fetchSymptoms(); // Fetch symptoms on component mount
    }, [token]); // Depend on token to reload if it changes

    // Process the data for the chart
    const chartData = {
        labels: symptoms.map(symptom => symptom.date), // Use date as the label on X-axis
        datasets: [
            {
                label: 'Severity',
                data: symptoms.map(symptom => symptom.severity),
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
                    text: 'Date',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                    color: '#444',
                },
                ticks: {
                    autoSkip: true,
                    maxRotation: 45, // Rotate labels if needed for better readability
                    minRotation: 45,
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
                        const symptom = symptoms[context.dataIndex];
                        return `Date: ${symptom.date}, Symptom: ${symptom.name}, Severity: ${symptom.severity}`;
                    },
                },
            },
        },
    };

    if (loading) {
        return <p>Loading symptoms data...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (symptoms.length === 0) {
        return <p>No symptoms data available to display.</p>;
    }

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default SymptomChart;
