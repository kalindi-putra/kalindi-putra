const express = require('express');
const router = express.Router();
const model = require('../model/expense');
const user=require('../model/user')

const auth=require('../middleware/auth')


router.post('/',auth,async (req,res)=>{
    try{
       console.log('In add expense');
        console.log(req.body);

      const {
        category,
        amount,
      }=req.body

      if(amount <= 0 || amount.length > 8 )
      {
        return res.status(201).json({message:"Enter Valid Amount"})
      }

      const userId=await user.findByPk(req.user.userId)

      console.log('IN add expense, printing user_id',userId);

       const resp=await model.create({
        expenseName:category,
        amount:amount,
        userId:parseInt(userId.userId,10)
       })
      
       console.log(resp);
       res.status(200).json({message:"Expense added successFully"});

    }
    catch(err){
        
        console.log(err);
      res.status(500).json({message:"Internal server error!!"});
}
});

module.exports=router;