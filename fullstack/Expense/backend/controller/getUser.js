const express = require('express');
const router = express.Router();
const model = require('../model/User');

router.get('/', async (req, res) => {
    try {
        const data = await model.findAll();
        if (data !== null) {
            res.status(200).json(data);
        } else {
            res.status(404).json("No data in model");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
