const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const socialmediaController = require('../controllers/socialmedia')

router.get('/all-socialmedias', socialmediaController.findAllSocialMedias)

router
    .route('/socialmedias')
    .get(verifyToken, socialmediaController.findSocialMedias)
    .post(verifyToken, socialmediaController.createSocialMedias)

router
    .route('/socialmedias/:socialmediaId')
    .put(verifyToken, socialmediaController.updateSocialMedias)
    .delete(verifyToken, socialmediaController.deleteSocialMedias)

module.exports = router