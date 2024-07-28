// models/user.js
const { DataTypes, BelongsTo } = require('sequelize');
const sequelize = require('../util/db'); // Assuming your Sequelize instance is configured in this file

const Donation = sequelize.define('Donation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
                primaryKey: true,
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    charity_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

sequelize.sync({ force: false }) // Use `alter: true` to update the schema without dropping tables
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronizing database:', err));





module.exports = Donation;

