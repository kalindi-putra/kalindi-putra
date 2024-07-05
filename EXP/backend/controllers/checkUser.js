const express = require('express');
const router = express.Router();
const model = require('../model/user');
const bc=require('bcrypt')

router.post('/',async (req,res)=>{
    try{
       // const check=await model.findAll({where:{phone:req.body.phone}});
       const {email} =req.body;
      console.log(req.body);

       if(!email)
       {
        res.status(204).json("Pls fill all values");
       }

       const User= await model.findOne({ where:{email:email }})
       console.log(User);

       if(!User)
       {
         return  res.status(404).json({
            "flag":"N"
        });
       }

     return  res.status(200).json(
        {
            "flag":"Y"
        }
      )    
       
    }

    catch(err)
    {
        
    return   res.status(500).json(err);
}
});

module.exports=router;