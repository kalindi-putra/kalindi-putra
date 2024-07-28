// routes/charity.js continued...
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Charity = require('../models/charity');
const Project = require('../models/projectModel'); // Assuming you have a Project model
const charityVerify=require('../middleware/charityAuth')

// Update charity profile

// Create project for charity
router.post('/projects', charityVerify, async (req, res) => {
    const charityId = req.charityId;
    const { name, description, targetAmount } = req.body;

    try {
        const charity = await Charity.findByPk(charityId);

        if (!charity) {
            return res.status(404).json({ error: 'Charity not found' });
        }

        const newProject = await Project.create({
            name,
            description,
            targetAmount,
            CharityId: charityId
        });

        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
