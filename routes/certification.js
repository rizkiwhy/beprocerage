const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const certificationController = require('../controllers/certifications')

router.get('/all-certifications', certificationController.findAllCertifications)

router
    .route('/certifications')
    .get(verifyToken, certificationController.findCertifications)
    .post(verifyToken, certificationController.createCertifications)

router
    .route('/certifications/:certificationId')
    .put(verifyToken, certificationController.updateCertifications)
    .delete(verifyToken, certificationController.deleteCertifications)

module.exports = router