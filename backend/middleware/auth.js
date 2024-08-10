const jwt=require('jsonwebtoken');
const User=require('../model/user')

const secret='12345678'

 const auth= async(req,res,next)=>{
   try{
             const token=req.header('Authorization');
   
             if(!token){
               return res.status(401).json({"message":"Invalid Signature"})
             }

             console.log('\nIn auth\n');
             const user=jwt.verify(token,secret);

             console.log('User_id',user.email);
             const email=user.email

             const U=await User.findOne({email})

             if(!U){
               return res.status(401).json({"message":"User Not found"})
             }

             console.log('printing user details\n');
             console.log(JSON.stringify(U));

             req.user=U
             next();

            }
         
             catch(err)
             {
                console.log(err);
                return res.status(401).json({message:"User not found",error:err})
             }


 }


 module.exports=auth