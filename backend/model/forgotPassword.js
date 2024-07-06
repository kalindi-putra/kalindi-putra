const { Sequelize, DataTypes} = require('sequelize');
const {sequelize }=require('../util/db')
const User=require('./user')

const forgotPassword = sequelize.define('forgotPassword', {
    Id: {
        type: DataTypes.UUID,
        primaryKey: true
        //autoIncrement: true // Optional, if you want this field to auto-increment
      },
    isActive: {
      type: DataTypes.BOOLEAN,
      //allowNull: false,
       defaultValue:true
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

module.exports=forgotPassword;