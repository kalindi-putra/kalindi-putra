// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/db'); // Ensure this path is correct

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true // Unique constraint
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true // Uncomment if fullname should be unique
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true, // Mark id as primary key
        validate: {
            isEmail: true // Validate email format
        }
    },
    isAdmin: {
        type: DataTypes.STRING,
        defaultValue: 'N',
        validate: {
            isIn: [['Y', 'N']] // Validate that only 'Y' or 'N' are allowed
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
        // Consider adding validation for password length or format
    }
}, {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
    tableName: 'Users' // Ensure this matches the table name in your database
});



sequelize.sync({ force: false }) // Use `alter: true` to update the schema without dropping tables
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronizing database:', err));





module.exports = User;
