const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const profileController = require('../controllers/profile')

router.get('/all-profiles', profileController.findAllProfiles)

router
    .route('/profiles')
    .get(verifyToken, profileController.findProfiles)
    .post(verifyToken, profileController.createProfiles)

router
    .route('/profiles/:profileId')
    .put(verifyToken, profileController.updateProfiles)
    .delete(verifyToken, profileController.deleteProfiles)

module.exports = router