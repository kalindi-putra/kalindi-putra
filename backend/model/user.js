const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
  userId: {
    type: Schema.Types.UUID,
    default: mongoose.Types.UUID, // Use UUID for unique identifiers
    required: true,
    unique: true // Ensure Id is unique
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique
  },
  password: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  totalExpense: {
    type: Number,
    default: 0 // Default to 0 if not provided
  }
});


const Users = mongoose.model('Users', userSchema);

module.exports = Users;
