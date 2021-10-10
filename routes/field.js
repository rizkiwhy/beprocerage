const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const fieldController = require('../controllers/field')

router.get('/all-fields', fieldController.findAllFields)

router
    .route('/fields')
    .get(verifyToken, fieldController.findFields)
    .post(verifyToken, fieldController.createFields)

router
    .route('/fields/:fieldId')
    .put(verifyToken, fieldController.updateFields)
    .delete(verifyToken, fieldController.deleteFields)

module.exports = router