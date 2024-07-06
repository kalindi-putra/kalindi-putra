const { Sequelize, DataTypes} = require('sequelize');
const {sequelize }=require('../util/db')

const Users = sequelize.define('Users', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Optional, if you want this field to auto-increment
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
     // unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isPremium:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
    ,
   totalExpense:{
      type:DataTypes.INTEGER,
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

module.exports=Users;