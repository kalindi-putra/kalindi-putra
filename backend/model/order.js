const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Order schema
const orderSchema = new Schema({
  OrderId: {
    type: String,
    required: true,
    unique: true // Ensure OrderId is unique
  },
  OrderStatus: {
    type: String,
    
  },
  userId: {
    type: Schema.Types.UUID,
    ref: 'User', // Reference to the User model
    required: true
  }
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

