const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const verifyFile = require('../middleware/verifyFile')
const certificationController = require('../controllers/certification')

router.get('/all-certifications', certificationController.findAllCertifications)

router
    .route('/certifications')
    .get(verifyToken, certificationController.findCertifications)
    .post(verifyToken, verifyFile.uploadImage.single('image'), certificationController.createCertifications)

router
    .route('/certifications/:certificationId')
    .put(verifyToken, verifyFile.uploadImage.single('image'), certificationController.updateCertifications)
    .delete(verifyToken, certificationController.deleteCertifications)

module.exports = router