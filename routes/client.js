const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const verifyFile = require('../middleware/verifyFile')
const clientController = require('../controllers/client')


router.get('/all-clients', clientController.findAllClients)

router
    .route('/clients')
    .get(verifyToken, clientController.findClients)
    .post(verifyToken, verifyFile.uploadImage.single('image'), clientController.createClients)

router
    .route('/clients/:clientId')
    .put(verifyToken, verifyFile.uploadImage.single('image'), clientController.updateClients)
    .delete(verifyToken, clientController.deleteClients)

module.exports = router