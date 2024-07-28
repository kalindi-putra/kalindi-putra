// src/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // For custom styles

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="header">
                <h1>Welcome to DonateNow</h1>
                <p>Your one-stop platform for supporting charities and making a difference.</p>
            </header>
            <nav className="navigation">
                <ul>
                    <li><Link to="/register-user" className="nav-link">Register User</Link></li>
                    <li><Link to="/login-user" className="nav-link">Login User</Link></li>
                    <li><Link to="/register-charity" className="nav-link">Register/Login Charity</Link></li>
                    <li><Link to="/" className="nav-link">Home Page</Link></li>
                </ul>
            </nav>
            <footer className="footer">
                <p>&copy; 2024 DonateNow. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
