import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Helper function to get the token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('access_token'); // Retrieving the token stored in localStorage
};

// Function for signing up a user
export const signup = async (userData) => {
    return await axios.post(`${API_URL}/signup/`, userData);
};

// Function for logging in a user and receiving a token
export const login = async (userData) => {
    return await axios.post(`${API_URL}/login/`, userData);
};

// Function to add a symptom, including the authorization token in the headers
export const addSymptom = async (symptomData) => {
    const token = getAuthToken();  // Get the token from localStorage
    if (!token) {
        throw new Error("No token found. Please login first.");
    }
    return await axios.post(`${API_URL}/symptoms/`, symptomData, {
        headers: {
            'Authorization': `Bearer ${token}`,  // Attach token in the Authorization header
        },
    });
};

// Function to get symptoms, with token in the headers
export const getSymptoms = async () => {
    const token = getAuthToken();  // Get the token from localStorage
    if (!token) {
        throw new Error("No token found. Please login first.");
    }
    return await axios.get(`${API_URL}/symptoms/`, {
        headers: {
            'Authorization': `Bearer ${token}`,  // Attach token in the Authorization header
        },
    });
};
