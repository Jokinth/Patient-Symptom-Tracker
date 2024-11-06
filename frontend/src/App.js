
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';         
import Signup from './components/Signup';       
import SymptomLogger from './components/SymptomLogger'; 
import SymptomList from './components/SymptomList';
import Recommendations from './components/Recommendations';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logger" element={<SymptomLogger />} />
                <Route path="/symptom-list" element={<SymptomList />} />
                <Route path="/recommendations" element={<Recommendations />} />
            </Routes>
        </Router>
    );
};

export default App;
