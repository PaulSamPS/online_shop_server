const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const UserModel = sequelize.define('user',{
    username: {type: DataTypes.STRING, required: true, unique: true},
    email: {type: DataTypes.STRING, required: true, unique: true},
    password: {type: DataTypes.STRING, required: true},
    isAdmin: {type: DataTypes.BOOLEAN, defaultValue: false}
}, {timestamps: true})

module.exports = UserModel
