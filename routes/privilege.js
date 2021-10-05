const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const privilegeController = require('../controllers/privilege')

router.get('/all-privileges', privilegeController.findAllPrivileges)

router
    .route('/privileges')
    .get(verifyToken, privilegeController.findPrivileges)
    .post(verifyToken, privilegeController.createPrivileges)

router
    .route('/privileges/:privilegeId')
    .put(verifyToken, privilegeController.updatePrivileges)
    .delete(verifyToken, privilegeController.deletePrivileges)

module.exports = router