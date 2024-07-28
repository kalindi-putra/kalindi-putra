// models/charity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    targetAmount: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


sequelize.sync({ force: false }) // Use `alter: true` to update the schema without dropping tables
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronizing database:', err));


module.exports = Project;
