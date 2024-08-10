const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user'); // Ensure User model is correctly imported

// Define the forgotPassword schema
const forgotPasswordSchema = new Schema({
  Id: {
    type: Schema.Types.UUID,
    default: mongoose.Types.UUID, // Use UUID for unique identifiers
    required: true,
    unique: true // Ensure Id is unique
  },
  isActive: {
    type: Boolean,
    default: true
  },
  userId: {
    type: Schema.Types.UUID,
    ref: 'User', // Reference to the User model
    required: true
  }
});

// Create the forgotPassword model
const forgotPassword = mongoose.model('forgotPassword', forgotPasswordSchema);

module.exports = forgotPassword;
