const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Recipe=require('../models/recipeSchema')
const bc=require('bcrypt')
const User = require('../models/userModel'); // Import the User model
const multer=require('multer')
const auth=require('../util/auth')

//register of user
router.post('/register', async (req, res) => {
  const { name, email , password } = req.body;
   console.log(req.body)
  try {
    if(!name || !email || !password)
    {
        return res.status(401).json({message:"Fill all the values !!!"})
    }

    // Check if user already exists
    let user = await User.findOne({ email});
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const gensalt=await bc.genSalt(2);

     const pass= await bc.hash(password,gensalt);
// Create new user
    user = new User({ name, email, pass });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Sign-in route
router.post('/signin', async (req, res) => {
  const { email, pass } = req.body;

   console.log(req.body)

  try {
    // Check if user exists in database
    let user = await User.findOne({ email });
    if (!user) {
      console.log("user not found")
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bc.compare(pass, user.pass);
    if (!isMatch) {
      console.log("password did not matched")

      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.email,
        name: user.name
      }
    };
    let flag='N';
    if(user.isAdmin==true){
       flag='Y'
    }
    else{
      flag='N'
    }

    jwt.sign(payload, '123456789', { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({token: token, message:"Success",flag:flag});
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({message:"Internal Error"});
  }
});


//update profile
router.put('/me/update', auth, async (req, res) => {
  const { name, pass } = req.body;

  try {
    // Update user profile in database
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.name = name;
    user.pass = pass;

    await user.save();

    res.status(200).json({message:"Updated successfully",user});
  } 
  catch (error) {
    console.error(error.message);
    res.status(500).json({message:'Server Error'});
  }
});


//finding contributed receipe
router.get('/me/contributed-recipes', auth, async (req, res) => {
  try {
    // Fetch recipes contributed by the current user
    const recipes = await Recipe.find({ author: req.user.id });

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});



//fetching fav recipe
router.get('/me/favorite-recipes', auth, async (req, res) => {
  try {
    // Fetch recipes favorited by the current user
    const user = await User.findById(req.user.id).populate('favoriteRecipes');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favoriteRecipes);
  } 
  catch (error) 
  {
    console.error(error.message);
    res.status(500).json('Server Error');
  }
});


//getting user details
router.get('/me/fetch',auth,async(req,res)=>{
  try{
     const user=User.find(req.user.email)

     if(user)
     {
      res.status(200).json({"data":user})
     }
     else{
      throw new Error(e);
     }

  }

  catch(e)
  {
    res.json(e)

  }
} )



module.exports = router;

