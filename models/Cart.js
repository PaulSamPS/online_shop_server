const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const CartModel = sequelize.define('cart',{
    userId: {type: DataTypes.STRING, required: true},
    products: [
        {
            productId: {type: DataTypes.STRING},
            quantity: {type: DataTypes.NUMBER, default: 1},
        }
    ],
}, {timestamps: true})

module.exports = CartModel