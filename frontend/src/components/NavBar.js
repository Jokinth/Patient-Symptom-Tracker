import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <h2 className="navbar-title"><u>Symptom Tracker</u></h2>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/logger" className="nav-link">Log Symptom</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/symptom-list" className="nav-link">Symptom List</Link>
                        </li>
                    </ul>
                    <Link to="/">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
