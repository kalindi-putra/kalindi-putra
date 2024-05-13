const express = require('express');
const router = express.Router();
const model = require('../model/User');

router.post(async (req,res)=>{
    try{
       // const check=await model.findAll({where:{phone:req.body.phone}});
       const {name,email,phone} =req.body;
       const newUser= await model.create({
        name:name,
        email:email,
        phone:phone

       })
       console.log(newUser)
        res.status(200).json("successful");
       //res.status(200).json("hello again , idiot");
    }
    catch(err){
        
     console.log(err);
}
});

module.exports=router;