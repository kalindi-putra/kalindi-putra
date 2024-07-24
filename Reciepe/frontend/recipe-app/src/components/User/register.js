// RegisterForm.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Example: replace with your actual register API endpoint
            const response = await axios.post('http://localhost:8000/register', {
                name,
                email,
                password
            });
          alert(response.data.message)

            // Clear form fields and error message
            setName('');
            setEmail('');
            setPassword('');
            setError('');
        } catch (error) {
            console.error('Error registering:', error);
            setError('Registration failed. Please try again.'); // Set error message for failed registration
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>} {}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default RegisterForm;
