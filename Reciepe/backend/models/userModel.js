// models/User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  name: {
    type: String,
    required: true,
    //unique: true
  },
  pass: {
    type: String,
    required: true
  },
  favoriteRecipes:{
      type:[String],
      required:false
  },
  isAdmin:{
     type:Boolean,
      default:false
  }
});

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
