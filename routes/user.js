const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/VerifyToken');
const router = require('express').Router()
const userController = require('../controllers/userController')

router.put('/:id', verifyTokenAndAuthorization, userController.changeUser)
router.delete('/:id', verifyTokenAndAuthorization, userController.deleteUser)
router.get('/find/:id', verifyTokenAndAdmin, userController.findUser)
router.get('/', verifyTokenAndAdmin, userController.findAllUsers)

module.exports = router