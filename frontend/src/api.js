
import axios from 'axios';

const API_URL = 'http://localhost:8000'; 

export const signup = async (userData) => {
    return await axios.post(`${API_URL}/signup/`, userData);
};

export const login = async (userData) => {
    return await axios.post(`${API_URL}/login/`, userData);
};

export const addSymptom = async (symptomData) => {
    return await axios.post(`${API_URL}/symptoms/`, symptomData);
};

export const getSymptoms = async () => {
    return await axios.get(`${API_URL}/symptoms/`);
};
