const express = require('express');
const router = express.Router();
const Razorpay=require('razorpay')
const key=require('../util/keys')


const razorpay = new Razorpay({
    key_id: key.RAZORPAY_KEY_ID,
    key_secret: key.RAZORPAY_KEY_SECRET
});



router.post('/', async (req, res) => 
{
    const amount = 50000; 
    const currency = 'INR';

    const options = {
        amount: amount,
        currency: currency,
       // receipt: '12345', // Replace with your order ID or unique identifier
        payment_capture: 1 // Auto capture payment
    };

    try {
        console.log('Before Order creation in razorPay');

        const response = await razorpay.orders.create(options);
        console.log('\nOrder created successfully\n');


        res.status(200).json(response);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({
            message:'Failed to create Razorpay order'});
    }
});


module.exports=router