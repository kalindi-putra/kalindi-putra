const express = require('express');
const router = express.Router();
//const model = require('../model/expense');
const user=require('../../model/user')
const order=require('../../model/order')
const auth=require('../../middleware/auth')


router.get('/',auth,async(req,res)=>{

    try {
      const p=  await user.findAll({
            attributes:[
                  'userId','totalExpense','name'
            ],
            order: [
                ['totalExpense', 'DESC'] // Order by totalExpense in descending order
            ]
        })

        console.log(JSON.stringify(p));

        res.status(200).json(p)

    } 
    
    catch (error)
     {

        console.log(JSON.stringify(error));
        res.status(500).json(error)
    }

})

module.exports=router