const mongoose = require('mongoose');
const key = require('../util/keys');

// Initialize Mongoose with your MongoDB connection string
const mongoUri = `mongodb://localhost:27017/admin`;

// Connect to MongoDB
const run= async()=>{
  await mongoose.connect(mongoUri, {
})
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
}

//run()


// Export the Mongoose connection
module.exports = run;
