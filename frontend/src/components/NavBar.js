
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar" role="navigation">
            <div className="navbar-header">
                <h2 className="navbar-title"><u>Symptom Tracker</u></h2>
            </div>
            <ul className="navbar-menu">
                <li>
                    <Link to="/logger" className="navbar-link">Log Symptom</Link>
                </li>
                <li>
                    <Link to="/symptom-list" className="navbar-link">Symptom List</Link>
                </li>
            </ul>
            <div className="login-button-container">
                <Link to="/">
                    <button className="login-button">Login</button>
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
