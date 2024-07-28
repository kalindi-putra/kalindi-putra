// src/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making HTTP requests

const LogIn = () => {
    const navigate=new useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const { email, password } = formData;
        const newErrors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:8000/user/login', {
                    email: formData.email,
                    password: formData.password,
                });

                // Save token to local storage or state
                localStorage.setItem('token', response.data.token);

                setSuccessMessage('Login successful!');
                navigate('/userDashboard')
                setErrors({});
            } catch (error) {
                if (error.response) {
                    setErrors({ server: error.response.data.error });
                } else {
                    setErrors({ server: 'An unexpected error occurred' });
                }
            }
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Sign In</h2>
            {successMessage && <p className="success">{successMessage}</p>}
            {errors.server && <p className="error">{errors.server}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default LogIn;
