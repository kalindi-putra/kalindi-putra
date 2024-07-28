// src/App.js
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import Dashboard from './components/UserDashboard';
import Donate from './components/Donate';
import RegisterCharity from './components/RegisterCharity';

function App() {
  const UserLoggedin=localStorage.getItem('token')!==null;
  const CharityLoggedin=localStorage.getItem('charityToken')!==null;
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register-user">Register User</Link></li>
                    <li><Link to="/login-user">Login</Link></li>
                    <li><Link to="/register-charity">Register Charity</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register-user" element={<RegisterUser />} />
                <Route path="/login-user" element={<LoginUser />} />
                <Route path="/userdashboard" element={<Dashboard />} />
                <Route path="/user/donate" element={<Donate />} />
                <Route path="/register-charity" element={<RegisterCharity />} />
            </Routes>
        </Router>
    );
}

export default App;
