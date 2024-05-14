const express = require('express');
const router = express.Router();
const model = require('../model/User');

router.post('/',async (req,res)=>{
    try{
      if(req.body.itemname == null || req.body.quantity==null || req.body.price== null)
       {
        res.status(404).json("Please fill all values");
      }
       const data =req.body;
       const newUser= await model.create({
        itemname:data.itemname,
        quantity:data.quantity,
        price:data.price

       })
        console.log(newUser)
        res.status(200).json(newUser);
       //res.status(200).json("hello again , idiot");
    }
    catch(err){
        
     console.log(err);
}
});

module.exports=router;