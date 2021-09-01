const express = require('express')
const router = express.Router()
const verify = require('../middleware/verifyToken')

const authController = require('../controllers/auth')

router.post('/auth/register', authController.registerUser)
router.post('/auth/login', authController.loginUser)
router.put('/auth/:userId', verify, authController.updateUser)
router.get('/auth/:userId', verify, authController.findUser)

module.exports = router