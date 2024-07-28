// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const config = require('../');
const auth=require('../middleware/auth')
const User = require('../models/userModel');
const Donation=require('../models/Donation')

const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
    let { fullname, email, password } = req.body;

    try {
        // Check if username or email already exists
        const existingUser = await User.findOne({where:{email}});

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Create new user
        const gen= await bcrypt.genSalt(10);
        pass=await bcrypt.hash(password,gen)
        const newUser = await User.create({
            fullname,
            email,
            password:pass
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error:err });
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.email }, '123456789', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Get user profile
router.get('/profile', auth, async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] } // Exclude password from response
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
    const userId = req.userId;
    const { fullname } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.fullname = fullname || user.fullname;

        await user.save();

        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get user donation history
router.get('/donations', auth, async (req, res) => {
    const userId = req.userId;

    try {
        const donations = await Donation.findAll({
            where: { userId },
        });

        res.json({ donations });
    } catch (err) {
        console.error('Error fetching donation history:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

