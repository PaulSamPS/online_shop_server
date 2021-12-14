const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const OrderModel = sequelize.define('order',{
    userId: {type: DataTypes.STRING, required: true},
    products: [
        {
            productId: {type: DataTypes.STRING},
            quantity: {type: DataTypes.NUMBER, default: 1},
        }
    ],
    amount: {type: DataTypes.NUMBER, required: true},
    address: {type: DataTypes.ARRAY, required: true},
    status: {type: DataTypes.STRING, default: 'pending'}
}, {timestamps: true})

module.exports = OrderModel