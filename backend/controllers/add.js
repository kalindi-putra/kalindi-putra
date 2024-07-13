const express = require('express');
const router = express.Router();
const model = require('../model/user');
const bcrypt=require('bcrypt')


function checkPasswordStrength(password) {
  // Regex patterns
  const lengthRegex = /^.{6,10}$/;        // Match length between 6 to 10 characters
  const letterRegex = /[a-zA-Z]/;         // Match at least one letter
  const numberRegex = /\d/;               // Match at least one digit
  const specialCharRegex = /[\W_]/;       // Match at least one special character (non-alphanumeric)

  if (
      lengthRegex.test(password) &&
      letterRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)
  ) {
      return true;
  } else {
      return false;
  }
}


router.post('/',async (req,res)=>{
    try{
       // const check=await model.findAll({where:{phone:req.body.phone}});
       const {name,email,pass} = req.body;

      // console.log(req.body);
       console.log(name,email,pass);
       if(name===undefined || email===undefined || pass===undefined)
       {
         console.log(req.body);
         return res.status(204).json({message:"Pls fill all values"});
       }

      const exist_user=await model.findOne({
        where:{
            email:email
        }  })
       if(exist_user)
       {
        console.log(req.body);

        console.log(2);
        console.log(exist_user);
             return res.status(201).json({message:'User already exists'});
       }

      if(!checkPasswordStrength(pass))
      {
        return res.status(201).json({message:"Password not according to format"})
      }

        

        const gensalt=await bcrypt.genSalt(2);

        const userPassword= await bcrypt.hash(pass,gensalt);


       const newUser= await model.create({
        name:name,
        email:email,
        password:userPassword

       })
       console.log('User created successfully-',newUser)
         res.status(200).json({message:"successful"});
    }
    catch(err){
        
        console.log(err);
      res.status(500).json(err);
}
});

module.exports=router;