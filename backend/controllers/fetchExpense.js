const express = require('express');
const router = express.Router();
const Expense = require('../model/expense'); // Your Mongoose model for expenses
const User = require('../model/user'); // Your Mongoose model for users
const auth = require('../middleware/auth');

// Route to fetch expenses
router.get('/', auth, async (req, res) => {
  try {
    console.log('\nIn the fetch expense >>\n');

    // Pagination settings
    const page = parseInt(req.query.page) || 1; // Default page 1 if not provided
    const perPage = parseInt(req.query.perPage) || 2; // Default 2 expenses per page

    // Calculate offset for pagination
    const skip = (page - 1) * perPage;

    // Query to fetch expenses for the current user
    const expenses = await Expense.find({ userId: req.user.userId })
      .sort({ createdAt: -1 }) // Order by createdAt descending
      .skip(skip)
      .limit(perPage);

    const totalCount = await Expense.countDocuments({ userId: req.user.userId });
    const totalPages = Math.ceil(totalCount / perPage);

    const userDetails = await User.findOne({ userId: req.user.userId });

    console.log(2)

    // Aggregate total expenses for each user
    const aggregateResult = await Expense.aggregate([
      { $match: {} }, // Match all documents
      { $group: { _id: "$userId", totalExpense: { $sum: "$amount" } } }
    ]);

    console.log(3)

    // Find the user's total expense
    let userTotalExpense = 0;
    for (const result of aggregateResult) {
      if (result._id.toString() === req.user.userId) {
        userTotalExpense = result.totalExpense;
        break;
      }
    }

    // Update the user with the total expense
    await User.updateOne(
      { userId: req.user.userId },
      { totalExpense: userTotalExpense }
    );

    console.log({
      expenses: expenses,
      totalPages: totalPages,
      currentPage: page,
      isNext: page < totalPages ? 1 : 0,
      isPrev: page > 1 ? 1 : 0,
      IsPremium: userDetails.isPremium,
    })
    
    

    return res.status(200).json({
      expenses: expenses,
      totalPages: totalPages,
      currentPage: page,
      isNext: page < totalPages ? 1 : 0,
      isPrev: page > 1 ? 1 : 0,
      IsPremium: userDetails.isPremium,
    });



  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
