const express = require('express');
const router = express.Router();
const model = require('../model/User');


router.put('/:id',async (req,res)=>{
    try{
        const data= await model.findByPk(req.params.id);

        if(!data){
            res.status(404).json("No user in DB!!!");
        }

       await data.update({
            itemname:req.body.itemname || data.itemname,
            quantity:req.body.quantity || data.quantity,
            price:req.body.price || data.price
        });
        await data.save();

       res.status(201).json("Success fully added");

    }

    catch (err){console.log(err)
        res.json(err.data);
    }
})


module.exports=router;