const express = require('express');
const router = express.Router();
const model = require('../model/User');


router.get('/:id',async (req,res)=>{
    try{
           const id=req.params.id;
           console.log(id);
           const {itemname,quantity,price}= await model.findOne({where:{userId : id}}); 
         res.json({itemname,quantity,price});    

    }
    catch(err){
        console.log(err);
    }
});

module.exports=router;