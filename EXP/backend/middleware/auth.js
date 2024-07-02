const jwt=require('jsonwebtoken');
const User=require('../model/user')

const secret='12345678'

 const auth= async(req,res,next)=>{
   try{
             const token=req.header('Authorization');
             console.log('\nIn auth\n');
             const user=jwt.verify(token,secret);

             console.log('User_id',user.email);
             const email=user.email

             User.findOne({where:{email}}).then(user=>{

                console.log('printing user details\n');
                console.log(JSON.stringify(user));

                req.user=user
                next();
                
             }).catch(err=>{
                throw new Error(err)
             })
            }
             catch(err)
             {
                console.log(err);
                return res.status(401).json({message:"User not found",error:err})
             }


 }


 module.exports=auth