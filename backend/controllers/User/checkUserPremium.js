const express = require('express');
const router = express.Router();
//const model = require('../model/expense');
const user=require('../../model/user')
const order=require('../../model/order')
const auth=require('../../middleware/auth')


router.get('/',auth,async(req,res)=>{

    try {
        const id=req.user.userId
        const user = await User.findOne(
            { userId: id }, // Query filter
            { isPremium: 1, name: 1 } // Projection object
          ).exec();

        

        console.log('\nPrinting record from user in checkPremium >>> \n',JSON.stringify(p));
        if(p.IsPremium==true)
        {
         res.status(200).json({flag:"Y",message:"Already a Premium User!!!"})
        }

        res.status(200).json({flag:"N" ,message:"NOt a premium user"})

        
    } 
    
    catch (error) 
    {

        console.log(error);
               res.status(500).json({flag:"N"})
        
    }
})

module.exports=router