const express = require('express');
const router = express.Router();
const model = require('../model/expense');


router.delete('/:Id',async(req,res)=>{

    try{
        const expId=await model.findByPk(req.params.Id);
        if(!expId)
        {
           return res.status(404).json({message:"Expense not found!!"})
        }
        const del=await model.destroy({
            where:{
                expenseId:expId.expenseId
            }
        })

            if(del===1)
            {
                return res.status(200).json({
                    message:"Expense deleted successfully!!!"
                })
            }
            else{
                return res.status(401).json({
                    message:"Unable to delete expense!!!"
                })
            }
        
    }
    catch(e)
    {
        res.status(500).json({
            message:"Internal Error!!!",
            error:e
        })
    }
})

module.exports=router