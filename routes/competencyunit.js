const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const competencyunitController = require('../controllers/competencyunit')

router.get('/all-competency-units', competencyunitController.findAllCompetencyunits)

router
    .route('/competency-units')
    .get(verifyToken, competencyunitController.findCompetencyunits)
    .post(verifyToken, competencyunitController.createCompetencyunits)

router
    .route('/competency-units/:competencyunitId')
    .put(verifyToken, competencyunitController.updateCompetencyunits)
    .delete(verifyToken, competencyunitController.deleteCompetencyunits)

module.exports = router