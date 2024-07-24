const express = require('express');
const router = express.Router();
const multer = require('multer');
const Recipe = require('../models/recipeSchema'); // Import the Recipe model
const auth = require('../util/auth'); // Import auth middleware for authentication
const { v4: uuidv4 } = require('uuid');


// Multer setup for handling file uploads (image)
const storage = multer.diskStorage(
    {
       // console.log('REached in multer')
  destination: function(req, file, cb)
   {
    cb(null, 'uploads/'); 
  },

  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + toString(file.originalname)); // Unique filename using timestamp
  }
});
const upload = multer({ storage });

router.post('/reciepe/upload', auth, upload.single('image'), async (req, res) => {

    console.log(req.body)
  const { title, ingredients, instructions, cookingTime, servings } = req.body;
  const imagePath = req.file ? req.file.path : null; // File path of the uploaded image
    const id=uuidv4()
  try {
    // Create new recipe object
    const newRecipe = new Recipe({
        id,
      title,
      ingredients: JSON.parse(ingredients), // Assuming ingredients are sent as JSON string
      instructions,
      cookingTime,
      servings,
      image: imagePath,
      author: req.user.email // Current authenticated user's ID
    });

    // Save recipe to database
    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.put('/reciepe/update/:id', auth, upload.single('image'), async (req, res) => {
  const { title, ingredients, instructions, cookingTime, servings } = req.body;
  const imagePath = req.file ? req.file.path : null; // File path of the uploaded image

  try {
    // Find recipe by ID
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if the current user is the author of the recipe
    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this recipe' });
    }

    // Update recipe fields
    recipe.title = title;
    recipe.ingredients = JSON.parse(ingredients);
    recipe.instructions = instructions;
    recipe.cookingTime = cookingTime;
    recipe.servings = servings;
    if (imagePath) {
      recipe.image = imagePath;
    }

    // Save updated recipe to database
    const updatedRecipe = await recipe.save();

    res.json(updatedRecipe);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/recipes/:id
// @desc    Delete a recipe by ID
// @access  Private (authenticated users only)
router.delete('/reciepe/delete/:id', auth, async (req, res) => {
  try {
    // Find recipe by ID
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if the current user is the author of the recipe
    if (recipe.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this recipe' });
    }

    // Delete recipe from database
    await recipe.remove();

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


//feteching reciepe list
const Recipe = require('../models/Recipe');

router.get('/recipe/fetch', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 4; // Default limit is 4 recipes per page

    try {
        // Fetch total count of recipes
        const totalCount = await Recipe.countDocuments();

        // Fetch paginated recipes
        const recipes = await Recipe.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();

        res.json({
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
            recipes
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Server error. Failed to fetch recipes.' });
    }
});


//seraching reciepe
router.get('/recipe/search', async (req, res) => {
    const query = req.query.q;
  
    try {
      const recipes = await Recipe.find({
        $or: [
          { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
          { ingredients: { $regex: query, $options: 'i' } }, // Case-insensitive description search
        ],
      });
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

//filtering reciepe
router.get('/recipes/filter', async (req, res) => {
    const { servings, cookingTime } = req.query;
  
    const filters = {};
    if (servings) filters.servings = servings;
    if (cookingTime) filters.cookingTime = cookingTime;
  
    try {
      const recipes = await Recipe.find(filters);
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


//Reciiepe Rating functionality


router.post('/recipes/rating/:recipeId/',auth, async (req, res) => {
    const { rating } = req.body;
    const id = req.params.recipeId;
  
    try {
      // Find the recipe by ID
      const recipe = await Recipe.findById(id);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      // Add new rating to the recipe
      recipe.ratings.push(rating);
  
      // Update average rating
      recipe.averageRating = calculateAverageRating(recipe.ratings);
  
      // Save updated recipe
      await recipe.save();
  
      res.status(201).json(recipe);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // POST a new review for a recipe
  router.post('recipes/:recipeId/reviews', async (req, res) => {
    const { user, text } = req.body;
    const id = req.params.recipeId;
  
    try {
      // Find the recipe by ID
      const recipe = await Recipe.findById(id);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      // Add new review to the recipe
      recipe.reviews.push({ user, text });
  
      // Save updated recipe
      await recipe.save();
  
      res.status(201).json(recipe);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  function calculateAverageRating(ratings) {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
  }
  





module.exports = router;
