const express = require('express');
const router = express.Router();
const multer = require('multer');
const User=require('../models/userModel')
const Recipe = require('../models/recipeSchema'); // Import the Recipe model
const auth = require('../util/auth'); // Import auth middleware for authentication


// GET all users (for admin)
router.get('/admin/users', async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Exclude password field
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // PUT endpoint to update user role (admin, user)
  router.put('/admin/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user role
      user.role = role;
      await user.save();
  
      res.json({ message: 'User role updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // DELETE endpoint to ban a user (admin)
  router.delete('/api/admin/users/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Perform actions to ban or delete user
      // Example: Set user status to 'banned' or remove user from database
      // This depends on your routerlication's specific requirements
  
      res.json({ message: 'User banned successfully', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  