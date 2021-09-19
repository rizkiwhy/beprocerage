const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const verifyFile = require('../middleware/verifyFile')
const expertiseController = require('../controllers/expertise')


router.get('/all-expertises', expertiseController.findAllExpertises)

router
    .route('/expertises')
    .get(verifyToken, expertiseController.findExpertises)
    .post(verifyToken, verifyFile.uploadImage.single('image'), expertiseController.createExpertises)

router
    .route('/expertises/:expertiseId')
    .put(verifyToken, verifyFile.uploadImage.single('image'), expertiseController.updateExpertises)
    .delete(verifyToken, expertiseController.deleteExpertises)

module.exports = router