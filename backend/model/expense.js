const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user'); // Ensure User model is correctly imported

// Define the Expense schema
const expenseSchema = new Schema({
  expenseId: {
    type: Schema.Types.UUID,
    default: mongoose.Types.UUID, // Use UUID for unique identifiers
    required: true,
    unique: true // Ensure Id is unique
  },
  expenseName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.UUID,
    ref: 'User', // Reference to the User model
    required: true
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
