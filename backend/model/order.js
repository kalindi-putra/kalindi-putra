const { Sequelize, DataTypes} = require('sequelize');
const {sequelize }=require('../util/db')
const User=require('./user')

const Order = sequelize.define('Order', {
    OrderId: {
        type: DataTypes.STRING,
        primaryKey: true,
        //autoIncrement: true // Optional, if you want this field to auto-increment
      },
    OrderStatus: {
      type: DataTypes.STRING,
      allowNull: true
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

module.exports=Order;