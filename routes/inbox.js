const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const inboxController = require('../controllers/inbox')

router.post('/new-inbox', inboxController.newInbox)

router
    .route('/inbox')
    .get(verifyToken, inboxController.findInbox)
    .post(verifyToken, inboxController.createInbox)

router
    .route('/inbox/:inboxId')
    .put(verifyToken, inboxController.updateInbox)
    .delete(verifyToken, inboxController.deleteInbox)

module.exports = router