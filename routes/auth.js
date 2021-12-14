const router = require('express').Router()
const userController = require('../controllers/authController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)

module.exports = router