const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer')

router.get('/customers', customerController.findCustomers)
router.post('/customers', customerController.createCustomers)
router.get('/customers/:customerId', customerController.findCustomersById)
router.put('/customers/:customerId', customerController.updateCustomers)
router.delete('/customers/:customerId', customerController.deleteCustomers)

module.exports = router