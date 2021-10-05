const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const contactController = require('../controllers/contact')

router.get('/all-contacts', contactController.findAllContacts)

router
    .route('/contacts')
    .get(verifyToken, contactController.findContacts)
    .post(verifyToken, contactController.createContacts)

router
    .route('/contacts/:contactId')
    .put(verifyToken, contactController.updateContacts)
    .delete(verifyToken, contactController.deleteContacts)

module.exports = router