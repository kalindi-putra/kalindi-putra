const express = require('express');
const router = express.Router();
const ForgotPassword = require('../../model/forgotPassword'); // Mongoose model for forgotPassword
const User = require('../../model/user'); // Mongoose model for user
const { v4: uuidv4 } = require('uuid');
const Sib = require('./sendBlue'); // Email service module

const uid = uuidv4(); // Generates a new UUID string

router.post('/', async (req, res) => {
    console.log('printing request user >>>', req.body.email);

    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email }).select('userId');

        if (user) {
            console.log('Printing Uuid >>> ', uid);

            // Create forgotPassword record
            const p1 = await ForgotPassword.create({
                Id: uid,
                userId: user.userId // Assuming userId is a string, no need for parseInt
            });

            const url = `http://localhost:8000/user/updatePassword/${uid}`;
            console.log(url);

            // Send email with the reset link
            const p2 = await Sib.sendPassMail(url, user.userId);

            // Respond after both operations are completed
            await Promise.all([p1, p2]);

            console.log('\nIn the send mail Promise \n');
            res.status(200).json({ message: "Reset Link sent to your Email ID" });
        } else {
            res.status(404).json({ message: 'Email doesn\'t exist' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
