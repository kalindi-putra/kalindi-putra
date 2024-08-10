const express = require('express');
const router = express.Router();
const model = require('../model/order');
const user=require('../model/user')
const auth=require('../middleware/auth')
const mongoose=require('mongoose')

router.post('/',auth,async (req,res)=>{

    try
     {
        console.log(req.user.userId)
        const id=req.user.userId;
        const U = await user.findOne({ userId:id }).exec();
       const p1= await model.create(
            {
                OrderId:req.body.razorpay_order_id,
                OrderStatus:"S",
                userId:id
            }
        )

        const p2 = await user.updateOne(
            {                 userId:id            }, // Query filter
            { $set: { isPremium: true } } // Update operation
          ).exec();

        await Promise.all([p1,p2])
        return res.status(200).json({message:"You are premium user now!!",flag:'Y'})

    }
    catch (error) {
        
        console.log('\n\n',error,'\n\n');
        res.status(500).json({message:"Internal Error!!",flag:'N',error:error});
    }

})

module.exports=router;