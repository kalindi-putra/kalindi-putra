import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        navigate('/login-user');
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to Your Dashboard</h2>
            <div className="dashboard-links">
                <Link to="/user/donate" className="dashboard-link">Donate</Link>
                <br />
                <Link to="/user/donation-history" className="dashboard-link">View Donation History</Link>
                <br />
                <Link to="/user/manage-profile" className="dashboard-link">Manage Profile</Link>
                <br />
            </div>

            <footer className="footer">
            <button onClick={handleLogout} className="logout-button">Logout</button>
            </footer>
        </div>
    );
};

export default UserDashboard;
