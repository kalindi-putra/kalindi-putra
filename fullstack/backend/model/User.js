const { Sequelize, DataTypes} = require('sequelize');
const {sequelize }=require('../util/database')

const User = sequelize.define('User', {
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
    phone: {
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

module.exports=User;