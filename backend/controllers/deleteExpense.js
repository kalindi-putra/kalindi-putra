const express = require('express');
const router = express.Router();
const Expense = require('../model/expense'); // Ensure this points to your Mongoose model

// Delete an expense by ID
router.delete('/:id', async (req, res) => {

    console.log(req.params)

    const id = req.params.id; // Mongoose will use _id by default

    try {
        // Find the expense by ID
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found!' });
        }

        // Delete the expense
        await Expense.findByIdAndDelete(id);

        // Send success response
        return res.status(200).json({ message: 'Expense deleted successfully!' });
    } catch (e) {
        console.error(e); // Log error for debugging
        return res.status(500).json({
            message: 'Internal Error!',
            error: e.message
        });
    }
});

module.exports = router;
