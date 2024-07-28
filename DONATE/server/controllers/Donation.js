// routes/donation.js continued...
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Donation = require('../models/donation');
const Charity = require('../models/charity');
const User = require('../models/userModel');
const auth = require('../middleware/auth');
const Razorpay = require('razorpay');
const sgMail=require('sendgrid')

// Initialize Razorpay with your key and secret
const razorpay = new Razorpay({
    key_id: "rzp_test_rirQjmZBf6uf04",
    
    key_secret: "2l00y6SDfaevLYhaTjXcCp0D"
});

// Handle donation
router.post('/donate', auth, async (req, res) => {
    const { charityId, amount } = req.body;

    try {
        const charity = await Charity.findByPk(charityId);
        if (!charity) {
            return res.status(404).json({ message: 'Charity not found' });
        }

        // Create a new order with Razorpay
        const options = {
            amount: Math.round(amount * 100), // Razorpay requires amount in paise
            currency: 'INR', // Use INR or your preferred currency
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1 // Auto-capture the payment
        };

        const order = await razorpay.orders.create(options);

        // Record the donation (you might want to adjust this based on your needs)
        const donation = await Donation.create({
            amount,
            UserId: req.userId,
            CharityId: charityId,
            orderId: order.id // Store the Razorpay order ID
        });
         


          // Fetch user details
          const user = await User.findOne(req.userId);

          // Send confirmation email
          const msg = getDonationConfirmationEmail(user, donation);
          await sgMail.send(msg);


        res.status(201).json({
            message: 'Donation successful',
            donation,
            orderId: order.id
        });
    } 
    catch (err)
     {
        console.error('Error processing donation:', err);
        res.status(500).json({ message: 'Server error' });
    }
});





// Handle getting donation history
router.get('/donations', auth, async (req, res) => {
    try {
        const donations = await Donation.findAll({
            where: { UserId: req.userId },
            order: [['createdAt', 'DESC']] // Order by most recent
        });

        res.status(200).json(donations);
    } catch (err) {
        console.error('Error fetching donation history:', err);
        res.status(500).json({ message: 'Server error' });
    }
});



// routes/donation.js continued...
const pdf = require('pdfkit');
const { PassThrough } = require('stream');

// Handle downloading a receipt
router.get('/donations/receipt', auth, async (req, res) => {
    const { id } = req.body;

    try {
        const donation = await Donation.findOne({
            where: { id, UserId: req.userId },
        });

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        // Generate PDF receipt
        const doc = new pdf();
        const receiptStream = new PassThrough();
        doc.pipe(receiptStream);
        doc.text(`Receipt for Donation\n\n`);
        doc.text(`Donation ID: ${donation.id}`);
        doc.text(`Amount: ${donation.amount}`);
        doc.text(`Charity: ${donation.charity_name}`);
        doc.text(`Date: ${donation.createdAt}`);
        doc.end();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="receipt_${donation.id}.pdf"`);
        receiptStream.pipe(res);

    } catch (err) {
        console.error('Error generating receipt:', err);
        res.status(500).json({ error: 'Server error' });
    }
});






module.exports = router;
