const express = require('express');
const router = express.Router();
const Expense = require('../model/expense'); // Ensure this is a Mongoose model
const User = require('../model/user'); // Ensure this is a Mongoose model
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// Route to add an expense
router.post('/', auth, async (req, res) => {
  try {
    console.log('In add expense');
    console.log(req.body);

    const { category, amount } = req.body;

    if (parseInt(amount) <= 0 || parseInt(amount) > 99999999) {
      return res.status(400).json({ message: "Enter a valid amount" });
    }

    const email = req.user.email;
    const userRecord = await User.findOne({ email });

    // Check if user exists
    if (!userRecord) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = userRecord.userId; // Assuming userId is an ObjectId

    // Create a new expense

    const expenseId = uuidv4(); // Generate a unique ID

    const expense = await Expense.create({
      expenseId: expenseId,
      expenseName: category,
      amount: amount,
      userId: userId // Mongoose will automatically handle ObjectId types
    });

    console.log(JSON.stringify(expense));
    res.status(201).json({ message: "Expense added successfully", expense });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
