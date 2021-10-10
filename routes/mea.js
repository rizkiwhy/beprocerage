const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const meaController = require('../controllers/mea')

router.get('/all-meas', meaController.findAllMeas)

router
    .route('/meas')
    .get(verifyToken, meaController.findMeas)
    .post(verifyToken, meaController.createMeas)

router
    .route('/meas/:meaId')
    .put(verifyToken, meaController.updateMeas)
    .delete(verifyToken, meaController.deleteMeas)

module.exports = router