import axios from 'axios';

// ✅ Use the correct API base URL
const API_URL = 'https://patient-symptom-tracker-production.up.railway.app';

// Function for signing up a user
export const signup = async (userData) => {  
    return await axios.post(`${API_URL}/signup/`, userData);
};

// Function for logging in a user
export const login = async (userData) => {
    return await axios.post(`${API_URL}/login/`, userData);
};

// Function to add a symptom (Authenticated request)
export const addSymptom = async (symptomData) => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error("No token found. Please login first.");
    
    return await axios.post(`${API_URL}/symptoms/`, symptomData, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
};

// Function to get symptoms (Authenticated request)
export const getSymptoms = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error("No token found. Please login first.");
    
    return await axios.get(`${API_URL}/symptoms/`, {
        headers: { 'Authorization': `Bearer ${token}` },
    });
};
