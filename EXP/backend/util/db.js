const { Sequelize } = require('sequelize');
const key=require('../util/keys')
// Initialize Sequelize with your database credentials
const sequelize = new Sequelize(key.DB_SCHEMA , key.DB_USER,key.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql', // or any other dialect such as postgres, sqlite, etc.
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
  
module.exports={sequelize};