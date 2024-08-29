const express = require('express');
const router = express.Router();
const User = require('../../model/user'); // Import your User model
const auth = require('../../middleware/auth'); // Import your authentication middleware

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find({})
            .select('totalExpense name') 
            .sort({ totalExpense: -1 }) 
            .exec();

        console.log(JSON.stringify(users));

        res.status(200).json(users);
    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(500).json(error);
    }
});

module.exports = router;
