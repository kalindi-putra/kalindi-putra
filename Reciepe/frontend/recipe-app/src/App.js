import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Reciepe/reciepelist';
import Login from './components/User/login';
import Register from './components/User/register';
import Profile from './components/User/userProfile';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Update isLoggedIn state to false
    };

    return (
        <Router>
            <div>
                <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
