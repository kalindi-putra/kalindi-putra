const express = require('express');
const router = express.Router();
const model = require('../model/user');
const bcrypt=require('bcrypt')

router.post('/',async (req,res)=>{
    try{
       // const check=await model.findAll({where:{phone:req.body.phone}});
       const {name,email,pass} = req.body;

      // console.log(req.body);
       console.log(name,email,pass);
       if(name===undefined || email===undefined || pass===undefined)
       {
        console.log(1);
         console.log(req.body);
         return res.status(204).json("Pls fill all values");
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
             return res.status(201).json('User already exists');
       }

        //using bcrypt for passwords
       // const salt=10;
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