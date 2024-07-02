const express = require('express');
const router = express.Router();
//const model = require('../model/expense');
const user=require('../../model/user')
const order=require('../../model/order')

const auth=require('../../middleware/auth')


router.post('/',auth,async(req,res)=>{

    console.log('\n\nIn the Update USER\n');
   // console.log(req.body,"\n\n",JSON.stringify(req.user));

    try {

        if(req.body.flag='Y')
        {
          const up=  await user.update({
                isPremium:true
            },{
                where:{
                    UserId:req.user.userId
                }
            })

            console.log('\nPrinting update user response >>>>> ',up);

            if(!up)
            {
               return res.status(204).json({
                    message:"unable to update user to premium"
                })
            }
            res.status(200).json({message:"Upgraded to premium"});

            }
          
            else{
                res.status(204).json({
                    message:"Flag was not set to Y"
                })
            }
        }
    
    
    catch (error) {

        console.log(error);
         res.status(500).json({
            message:"Internal Server Error",
            error:error
         })
    }
})



module.exports=router