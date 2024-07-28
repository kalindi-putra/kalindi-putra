// routes/charity.js
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const auth=require('../middleware/auth')
const Charity = require('../models/charity');


// Charity registration (requires admin approval)
router.post('/register', async (req, res) => {
    const { name, password } = req.body;

    try {
        // Check if charity already exists
        const existingCharity = await Charity.findOne({
            where: {
                name
            }
        });

        if (existingCharity) {
            return res.status(400).json({ message: 'Charity already registered' });
        }

        // Create new charity
        const newCharity = await Charity.create({
            name,
            password        });

        res.status(201).json({ message: 'Charity registered and awaiting approval' });
    } catch (err) {
        console.error('Error registering charity:', err);
        res.status(500).json({ error: 'Server error' });
    }
});
//charity registration

router.get('/signin', async(req,res)=>{
    try {
        const {name , password}=req.body
        const char=await Charity.findOne({ where:{name}})
        if(!char)
        {
            return res.status(404).json({message:"Chairy not registered yet"})
        }
        const isMatch = await bcrypt.compare(password, char.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        
        const token = jwt.sign({ Id: char.name }, '123456789', { expiresIn: '1h' });
         
        res.json(token)
        
    } 
    
    catch (error) {

        return res.status(500).json({error,message:"Internal Server Error"})
        
    }
})

// Get all charities (admin only)// route it with /admin
router.get('/all', async (req, res) => {
    try {
        const charities = await Charity.findAll();

        res.json({ charities });
    } catch (err) {
        console.error('Error fetching charities:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Approve or reject charity (admin only)
router.put('/status', auth, async (req, res) => {
    const { name ,status } = req.body;

    try {
        const charity = await Charity.findByPk(name);

        if (!charity) {
            return res.status(404).json({ error: 'Charity not found' });
        }

        charity.status = status;
        await charity.save();

        res.json({ message: `Charity status updated to ${status}` });
    } catch (err) {
        console.error('Error updating charity status:', err);
        res.status(500).json({ error: 'Server error' });
    }
});




// routes/charity.js continued...

// Handle adding an impact report
router.post('/charities/:id/impact-report', auth, async (req, res) => {
    const { id } = req.params;
    const { report } = req.body; // Ensure the report is well-structured

    try {
        const charity = await Charity.findByPk(id);
        if (!charity) {
            return res.status(404).json({ message: 'Charity not found' });
        }

        // Add new report
        charity.impactReports.push(report);
        await charity.save();

        res.status(201).json({ message: 'Impact report added successfully' });
    } catch (err) {
        console.error('Error adding impact report:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Handle getting impact reports
router.get('/charities/impact-reports', async (req, res) => {
    const { id } = req.body;

    try {
        const charity = await Charity.findByPk(id);
        if (!charity) {
            return res.status(404).json({ message: 'Charity not found' });
        }

        res.status(200).json(charity.impactReports);
    } catch (err) {
        console.error('Error fetching impact reports:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
