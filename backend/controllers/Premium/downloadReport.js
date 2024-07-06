const AWS = require('aws-sdk');
const key=require('../../util/keys')
const exp=require('../../model/expense')
const auth=require('../../middleware/auth');

const express = require('express');
const router = express.Router();

// Configure AWS credentials
AWS.config.update({
    accessKeyId: key.aws_key,
    secretAccessKey: key.aws_secret_key,
  });
  
  // Create S3 instance
  const s3 = new AWS.S3();
router.get('/',auth,async(req,res)=>{

//async function S3upload()
//{

    try {

        const p1=await exp.findAll({where:{
            userId:req.user.userId
        }})       

        if(p1)
        {
        const params = {
            Bucket: 'bucketshrey1',
            //aws s3api list-objects --bucket bucketshrey1 --prefix index.html
            Key: `Expense/${req.user.userId}/${new Date().toISOString()}.txt`, // File name you want to save as in S3
            Body: JSON.stringify(p1)
          }

       await s3.upload(params).promise().then(data=>{
        console.log('Data Upload success');
        res.status(200).json({message:"File download in progress",url:data.Location})
       }).catch(e=>{
        console.log(e);

        res.status(401).json({message:"Some error occured"})
       })

      // console.log('Printing s3 details >>>>>\n',p3.statusCode);
        }
        else{
            res.status(404).json({message:"No Expenses for the user!!"})
        }
    
        
    } 
    
    catch (error) 
    { 
        console.log(error);

        res.status(500).json({message:"Internal server error"})
        
    }

    


})

//S3upload()

module.exports=router