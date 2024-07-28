import React, { useState } from 'react';
import axios from 'axios';
import './CharityRegistration.css';

const CharityRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
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
        const { name, password } = formData;
        const newErrors = {};

        if (!name) {
            newErrors.name = 'Charity name is required';
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
                const response = await axios.post('http://localhost:8000/charity/register', formData);
                setSuccessMessage(response.data.message);
                setFormData({
                    name: '',
                    password: ''
                });
            } catch (error) {
                console.error('Error registering charity:', error);
                setErrors({ server: 'Error registering charity' });
            }
        }
    };

    return (
        <div className="charity-registration-container">
            <h2>Register Charity</h2>
            {successMessage && <p className="success">{successMessage}</p>}
            {errors.server && <p className="error">{errors.server}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Charity Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
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

export default CharityRegistration;
