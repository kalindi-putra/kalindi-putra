const express = require('express');
const router = express.Router();
const path=require('path')
// Constructing a path to your User module
const userModelPath = path.join(__dirname, '..', 'model', 'user');

const model = require(userModelPath);

const bc=require('bcrypt')
const jwt=require('jsonwebtoken')

const secret="12345678"


function generateToken(payload,secret)
{
   // payload
 return jwt.sign(payload,secret)
}

router.post('/',async (req,res)=>{
    try{
       // const check=await model.findAll({where:{phone:req.body.phone}});
       const {email,pass} =req.body;
        console.log(req.body);

       if(!email || !pass)
       {
       return  res.status(204).json("Pls fill all values");
       }

       const User= await model.findOne({email})
     //  console.log(User);

       if(User==null)
       {
         return res.status(404).json({message:"User doesn't exists !!!"})
       }


           //validating user details
           console.log('Reached till comparing passwords');
        const cmp= await bc.compare(pass,User.password)
        if(cmp)
        {

            console.log('Reached generate token');
             

      const token = generateToken({ email:email, IsPremium:User.isPremium}, secret); //issue here???

   // const token = generateToken({ email:email}, secret); //issue here???

                console.log('Token >>>>>>>',token)            

            console.log('passed',cmp);
            return    res.status(200).json({message:'SuccessfulLOgin','Token':token});
        }
        else{
            console.log('failed',cmp);
          return   res.status(404).json({message:'Email and password dont match!!'})
        }

       
    }

    catch(err)
    {
        console.log(err)
    return  res.status(500).json(err);
}
});

module.exports=router;