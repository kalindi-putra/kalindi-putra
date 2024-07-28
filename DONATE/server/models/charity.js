// models/charity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Charity = sequelize.define('Charity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    impactReports: {
        type: DataTypes.JSONB, // Store reports as JSON
        defaultValue: []
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    },

    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
});


sequelize.sync({ force: false }) // Use `alter: true` to update the schema without dropping tables
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronizing database:', err));

module.exports = Charity;
