const express = require('express');
const router = express.Router();
const model = require('../model/expense');
const user=require('../model/user')
const { Sequelize, DataTypes} = require('sequelize');
const auth=require('../middleware/auth')

router.get('/',auth, async (req,res)=>{
    try{
        console.log('\nIn the fetch expense >>\n');
            
        //
        const page = parseInt(req.query.page) || 1; // Default page 1 if not provided
        const perPage = parseInt(req.query.perPage) || 2; // Default 10 expenses per page

        // Calculate offset for pagination
        const offset = (page - 1) * perPage;

        // Query to fetch expenses for the current user
        const exp = await model.findAndCountAll({
            where: { userId: req.user.userId },
            limit: perPage,
            offset: offset,
            order: [['createdAt', 'DESC']], // Example order by createdAt descending
        });

     //console.log({exp:exp,IsPremium:p.IsPremium})

     const totalCount = exp.count;
        const totalPages = Math.ceil(totalCount / perPage);


     const p2=await user.findOne({where:{
       userId:req.user.userId
     }})

       //for premium user , creating the leaderboard
      const p3= await model.findAll({
        attributes: [
          'userId',
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalExpense']
      ],
      group: ['userId']
       })
       
       let p4;
       for(let i=0;i<p3.length;i++)
       {
           if(p3[i].dataValues.userId==req.user.userId)
           {

           p4=await user.update({
              totalExpense:p3[i].dataValues.totalExpense
             },{
              where:{
                userId:req.user.userId
              }
             })
         

           }
       }

      // console.log('\n>>>>>>>>>>>P4\n',p4);
       
       await Promise.all([exp,p2,p3,p4]).then(()=>{

        return res.status(200).json({
          exp:exp,
          totalPages: totalPages,
          currentPage: page,
          isNext:page < totalPages ? 1:0,
          isPrev:page > 1 ? 1:0,
          IsPremium:p2.isPremium,

        })

       }).catch(err=>{

        console.log(err);
        res.status(401).json({message:'Error in , pls try again !!'})
        
       })




    }
    catch(e){
        
        console.log(e);
      res.status(500).json({message:"Internal Server Error"});
}
});

module.exports=router;