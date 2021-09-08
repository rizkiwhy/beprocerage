const express = require('express')
const router = express.Router()
const verify = require('../middleware/verifyToken')

const authController = require('../controllers/auth')

router.post('/auth/register', authController.registerUser)
router.post('/auth/login', authController.loginUser)
router.post('/auth/logout/:userId', authController.logoutUser)
router.put('/auth/:userId', verify, authController.updateUser)
router.get('/auth', verify, authController.getMyData)

module.exports = router