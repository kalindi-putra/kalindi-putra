const express = require('express');
const router = express.Router();
const User = require('../../model/user'); // Import your User model
const auth = require('../../middleware/auth'); // Import your authentication middleware

router.get('/', auth, async (req, res) => {
    try {
        // Fetch all users, select specific fields, and sort by totalExpense in descending order
        const users = await User.find({})
            .select('totalExpense name') // Specify fields to include
            .sort({ totalExpense: -1 }) // Sort by totalExpense in descending order
            .exec();

        console.log(JSON.stringify(users));

        res.status(200).json(users);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json(error);
    }
});

module.exports = router;
