// LoginForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/signin', {
                email,
                pass
            });

            console.log('Login successful:', response.data.token);
            localStorage.setItem('token', response.data.token);

            // Clear form fields and error message
            setEmail('');
            setPass('');
            setError('');

            // Navigate to the home page after successful login
            navigate('/');

        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid credentials. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page after logout
    };

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('token') !== null;

    if (isLoggedIn) {
        return (
            <div>
                <button onClick={handleLogout}>Logout</button>
                <Link to="/profile">Manage Profile</Link>
            </div>
        );
    }

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
};

export default LoginForm;
