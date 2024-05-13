const express = require('express');
const router = express.Router();
const model = require('../model/User');


router.put('/:id',async (req,res)=>{
    try{
        const data= await model.findOne({where:{userId : req.params.id}}); 

        data.name = req.body.name || data.name; // If name is not provided in request body, keep the old value
        data.email = req.body.email || data.email;
        data.phone = req.body.phone || data.phone;

       await data.save();

    }

    catch (err){console.log(err)
        res.json(err.data);
    }
})


module.exports=router;