const express = require('express');
const router = express.Router();
const model = require('../model/User');


router.get('/:id',async (req,res)=>{
    try{
           const id=req.params.id;
           console.log(id);
           const {name,email,phone}= await model.findOne({where:{userId : id}}); 
        //console.log({name,email,phone})
         res.json({name,email,phone});    

    }
    catch(err){
        console.log(err);
    }
});

module.exports=router;