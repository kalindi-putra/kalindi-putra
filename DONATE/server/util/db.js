const { Sequelize } = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('defaultdb', 'avnadmin', 'AVNS_F-NAuIv6fUtJCLkZHFS', {
    host: 'pg-1d935af7-divyeshpandey47-8fd7.g.aivencloud.com',
    dialect: 'postgres',
    port: 24538,
    logging: false, // Set to true to log SQL queries, helpful for debugging
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Set to true for production, depends on your security requirements
        }
    }
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

module.exports = sequelize ;
