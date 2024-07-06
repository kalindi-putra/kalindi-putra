const { Sequelize } = require('sequelize');
const key=require('../util/keys')
// Initialize Sequelize with your database credentials
const sequelize = new Sequelize(key.DB_SCHEMA , key.DB_USER,key.DB_PASS, {
  host: 'mysql-21097ff9-divyeshpandey47-8fd7.c.aivencloud.com',
  dialect: 'mysql',
  port:"24538" // or any other dialect such as postgres, sqlite, etc.
});

// Test the connection
sequelize
  .authenticate()
  .then((res) => {
    console.log('Connection has been established successfully.',res);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
  
module.exports={sequelize};