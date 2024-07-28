// src/RegisterUser.js
import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        fullname: '',
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
        const { fullname, email, password } = formData;
        const newErrors = {};

        if (!fullname) newErrors.fullname = 'Full name is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) newErrors.password = 'Password is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:8000/user/register', {
                    fullname: formData.fullname,
                    email: formData.email,
                    password: formData.password
                });

                setSuccessMessage(response.data.message);
                setFormData({
                    fullname: '',
                    email: '',
                    password: '',
                });
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
        <div className="register-container">
            <h2>Register</h2>
            {successMessage && <p className="success">{successMessage}</p>}
            {errors.server && <p className="error">{errors.server}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name:</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                    />
                    {errors.fullname && <p className="error">{errors.fullname}</p>}
                </div>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterUser;
