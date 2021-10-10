const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const categoryController = require('../controllers/category')

router.get('/all-categories', categoryController.findAllCategories)

router
    .route('/categories')
    .get(verifyToken, categoryController.findCategories)
    .post(verifyToken, categoryController.createCategories)

router
    .route('/categories/:categoryId')
    .put(verifyToken, categoryController.updateCategories)
    .delete(verifyToken, categoryController.deleteCategories)

module.exports = router