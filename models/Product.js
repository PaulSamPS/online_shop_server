const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const ProductModel = sequelize.define('product',{
    title: {type: DataTypes.STRING, required: true, unique: true},
    desc: {type: DataTypes.STRING, required: true},
    img: {type: DataTypes.STRING, required: true},
    categories: {type: DataTypes.ARRAY},
    size: {type: DataTypes.STRING},
    color: {type: DataTypes.STRING},
    price: {type: DataTypes.NUMBER, required: true},
}, {timestamps: true})

module.exports = ProductModel
