const express = require('express');
const router = express.Router();
const model = require('../model/order');
const user=require('../model/user')
const auth=require('../middleware/auth')

router.post('/',auth,async (req,res)=>{

   //console.log('\n IN update Order , creating order and updating USER >>>> \n',
    //JSON.stringify(req.user));

    try
     {
        const U=await user.findByPk(req.user.userId)

       const p1= await model.create(
            {
                OrderId:req.body.razorpay_order_id,
                OrderStatus:"S",
                userId:parseInt(U.userId,10)
            }
        )

       const p2= await user.update(
        {
           isPremium:true
        },
           {
            where:
            {
               userId:req.user.userId
           }
        })
        //if(!t)
        await Promise.all([p1,p2])
        return res.status(200).json({message:"You are premium user now!!",flag:'Y'})

    }
    catch (error) {
        
        console.log('\n\n',error,'\n\n');
        res.status(500).json({message:"Internal Error!!",flag:'N',error:error});
    }

})

module.exports=router;