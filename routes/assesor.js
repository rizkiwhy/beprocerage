const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const verifyFile = require('../middleware/verifyFile')
const assesorController = require('../controllers/assesors')

router.get('/all-assesors', assesorController.findAllAssesors)

router
    .route('/assesors')
    .get(verifyToken, assesorController.findAssesors)
    .post(verifyToken, verifyFile.uploadImage.single('image'), assesorController.createAssesors)

router
    .route('/assesors/:assesorId')
    .put(verifyToken, verifyFile.uploadImage.single('image'), assesorController.updateAssesors)
    .delete(verifyToken, assesorController.deleteAssesors)

module.exports = router