const { Sequelize, DataTypes} = require('sequelize');
const {sequelize }=require('../util/db')
const User=require('./user')

const Expense = sequelize.define('Expense', {
    expenseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Optional, if you want this field to auto-increment
      },
    expenseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false

    }
  });
//creating relation 



(async ()=>{
    try{ 
        await  sequelize.sync({force:false}) 
        console.log('model sync success');
}
    catch(err){
        console.log(err);}
})();

module.exports=Expense;