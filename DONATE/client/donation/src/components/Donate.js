import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Donate.css';

const Donate = () => {
    const [charities, setCharities] = useState([]);
    const [formData, setFormData] = useState({
        charityId: '',
        amount: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Dynamically load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        // Fetch charities from the backend
        axios.get('http://localhost:8000/charity/all')
            .then(response => {
                // Ensure response data is an array
                const charitiesData = Array.isArray(response.data) ? response.data : [];
                setCharities(charitiesData);
            })
            .catch(error => {
                console.error('Error fetching charities:', error);
                setErrors({ server: 'Error fetching charities' });
            });

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const { charityId, amount } = formData;
        const newErrors = {};

        if (!charityId) {
            newErrors.charityId = 'Charity ID is required';
        }
        if (!amount || isNaN(amount) || amount <= 0) {
            newErrors.amount = 'Amount should be a positive number';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                // Request to create an order with Razorpay
                const response = await axios.post('http://localhost:8000/user/donate', {
                    charityId: formData.charityId,
                    amount: formData.amount,
                });

                const { orderId } = response.data;

                const options = {
                    key: 'rzp_test_rirQjmZBf6uf04', // Your Razorpay key
                    amount: formData.amount * 100, // Amount in paise
                    currency: 'INR',
                    name: 'Donation',
                    description: 'Thank you for your donation',
                    order_id: orderId,
                    handler: function (response) {
                        // Handle successful payment
                        axios.post('http://localhost:8000/user/donate', {
                            charityId: formData.charityId,
                            amount: formData.amount,
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature
                        }).then(res => {
                            setSuccessMessage('Donation successful!');
                        }).catch(err => {
                            setErrors({ server: 'Error completing donation' });
                        });
                    },
                    prefill: {
                        name: 'User',
                        email: 'user@example.com',
                        contact: '1234567890',
                    },
                    theme: {
                        color: '#3399cc',
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                setErrors({ server: 'Error processing donation' });
            }
        }
    };

    return (
        <div className="donate-container">
            <h2>Donate</h2>
            {successMessage && <p className="success">{successMessage}</p>}
            {errors.server && <p className="error">{errors.server}</p>}

            {charities.length === 0 ? (
                <p>No charities available at the moment.</p>
            ) : (
                <div className="charity-grid">
                    {charities.map(charity => (
                        <div key={charity.id} className="charity-card">
                            <h3>{charity.name}</h3>
                            <p>{charity.description}</p>
                            <button onClick={() => setFormData({ ...formData, charityId: charity.id })}>
                                Donate to {charity.name}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {charities.length > 0 && (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="charityId">Select Charity:</label>
                        <select
                            id="charityId"
                            name="charityId"
                            value={formData.charityId}
                            onChange={handleChange}
                        >
                            <option value="">Select a charity</option>
                            {charities.map(charity => (
                                <option key={charity.id} value={charity.id}>
                                    {charity.name}
                                </option>
                            ))}
                        </select>
                        {errors.charityId && <p className="error">{errors.charityId}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                        />
                        {errors.amount && <p className="error">{errors.amount}</p>}
                    </div>
                    <button type="submit">Donate</button>
                </form>
            )}
        </div>
    );
};

export default Donate;
