const express = require('express');
const router = express.Router();
const model = require('../../model/forgotPassword');
const user=require('../../model/user')


const { v4: uuidv4 } = require('uuid');

const uid = uuidv4(); // Generates a new UUID string



const Sib=require('./sendBlue')

router.post('/',async (req,res)=>{   
    console.log('printing request user >>>',req.body.email); 
   // debugger
   const p= await user.findOne({
    attributes:['userId']
   },
    {
        where:{
            email:req.body.email
        }
    })
   if(p)
   {
    try {
        const user=req.body.email

        console.log('Printing Uuid >>> ' ,uid);



        
        const p1=await model.create({
            Id:uid,
            userId:parseInt(p.userId,10)
        })


        const url=`http://18.232.215.9:3000/user/updatePassword/:${uid}`
       
        console.log(url);
       const p2=await Sib.sendPassMail(url,p.userId)

       await Promise.all([p1,p2]).then(
        resolve=>{
            console.log('\nIn the send mail Promise \n');
            res.status(200).json({message:"Reset Link sent to your Email ID",data:resolve})
        }
       ).catch(e=>{
        throw new Error(e)
       })

    }
    
    catch (e) {
        console.log(e);
        res.status(500).json({message:"Internal server error"})
        
    }
}
else{
    //console.log(p);
    res.status(404).json({message:'Email doesn\'t exists'})
}
})

module.exports=router