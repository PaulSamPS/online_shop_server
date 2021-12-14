const Router = require('express')
const router = new Router()
const authRouter = require('./auth')
const cartRouter = require('./cart')
const orderRouter = require('./order')
const productRouter = require('./product')
const userRouter = require('./user')

router.use('/auth', authRouter)
// router.use('/cart', cartRouter)
// router.use('/order', orderRouter)
// router.use('/product', productRouter)
router.use('/users', userRouter)

module.exports = router