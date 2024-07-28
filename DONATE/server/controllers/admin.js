// routes/admin.js
const express = require('express');
const router = express.Router();
const verifyAdminToken = require('../middleware/adminMiddleware');
const User = require('../models/user');
const Charity = require('../models/charity');

// Admin can get all users
router.get('/users', verifyAdminToken, async (req, res) => {
    try {
        const users = await User.findAll();
        res.json({ users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin can get all charities
router.get('/charities', verifyAdminToken, async (req, res) => {
    try {
        const charities = await Charity.findAll();
        res.json({ charities });
    } catch (err) {
        console.error('Error fetching charities:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin can approve or reject a charity
router.put('/charities/:charityId/status', verifyAdminToken, async (req, res) => {
    const { charityId } = req.params;
    const { status } = req.body;

    try {
        const charity = await Charity.findByPk(charityId);
        if (!charity) return res.status(404).json({ error: 'Charity not found' });

        charity.status = status;
        await charity.save();

        res.json({ message: `Charity status updated to ${status}` });
    } catch (err) {
        console.error('Error updating charity status:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin can delete a user
router.delete('/users/:userId', verifyAdminToken, async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.destroy();

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Admin can delete a charity
router.delete('/charities/:charityId', verifyAdminToken, async (req, res) => {
    const { charityId } = req.params;

    try {
        const charity = await Charity.findByPk(charityId);
        if (!charity) return res.status(404).json({ error: 'Charity not found' });

        await charity.destroy();

        res.json({ message: 'Charity deleted successfully' });
    } catch (err) {
        console.error('Error deleting charity:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
