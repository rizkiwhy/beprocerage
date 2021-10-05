const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const verifyFile = require('../middleware/verifyFile')
const photoController = require('../controllers/photo')


router.get('/all-photos', photoController.findAllPhotos)

router
    .route('/photos')
    .get(verifyToken, photoController.findPhotos)
    .post(verifyToken, verifyFile.uploadImage.single('image'), photoController.createPhotos)

router
    .route('/photos/:photoId')
    .put(verifyToken, verifyFile.uploadImage.single('image'), photoController.updatePhotos)
    .delete(verifyToken, photoController.deletePhotos)

module.exports = router