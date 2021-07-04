const express = require('express');
const router = express.Router();

const productController = require('../controllers/product')

router.post('/product', productController.createProduct)
router.get('/product', productController.readProduct)
router.put('/product', productController.updateProduct)
router.delete('/product', productController.deleteProduct)

module.exports = router