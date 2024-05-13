const express = require('express');
const router = express.Router();
const model = require('../model/User');

router.delete('/:id',(req,res)=>{

    model.destroy({where:{userId:req.params.id}}).
    then(res=>{console.log('successful delete',res);}).catch(err=>{
       console.log(err);
       res.json('successfull delete');
    });


});

module.exports=router;