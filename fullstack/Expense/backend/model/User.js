const { Sequelize, DataTypes} = require('sequelize');
const {sequelize }=require('../util/database')

const Expense = sequelize.define('Expense', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Optional, if you want this field to auto-increment
      },
    itemname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
     // unique: true
    },
    price: {
      type: DataTypes.STRING,
    //  primaryKey: true,
    //  unique:true,
      allowNull: false
    }
  });
(async ()=>{
    try{ 
        await  sequelize.sync({force:false}) 
        console.log('model sync success');
}
    catch(err){
        console.log(err);}
})();

module.exports=Expense;