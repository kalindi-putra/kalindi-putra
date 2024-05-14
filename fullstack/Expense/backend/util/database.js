const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('test', 'root', 'oracle', {
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