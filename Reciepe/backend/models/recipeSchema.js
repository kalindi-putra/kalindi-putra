// models/Recipe.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the recipe schema
const RecipeSchema = new Schema({
  id:{
     type:String,
     required:true
  },
  title: {
    type: String,
    required: true
  },
  author:{
    type:String,
    required:true
  },
  ingredients: {
    type: [String], // Assuming an array of ingredient strings
    required: true
  },
  instructions: {
    type: String,
    required: false
  },
  cookingTime: {
    type: Number, // Assuming cooking time in minutes
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  image: {
    type: String // URL or path to the recipe image
  },
  averageRating: { type: Number, default: 0 },
  ratings: [{ type: Number }],
});

// Create and export the Recipe model
module.exports = mongoose.model('Recipe', RecipeSchema);
