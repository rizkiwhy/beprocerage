const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const dessertController = require('../controllers/dessert')

router
    .route('/desserts')
    .get(verifyToken, dessertController.findDesserts)
    .post(verifyToken, dessertController.createDesserts)
// router.get('/desserts', verifyToken, dessertController.findDesserts)
// router.post('/desserts', verifyToken, dessertController.createDesserts)
router
    .route('/desserts/:dessertId')
    .put(verifyToken, dessertController.updateDesserts)
    .delete(verifyToken, dessertController.deleteDesserts)
// router.put('/desserts/:dessertId', verifyToken, dessertController.updateDesserts)
// router.delete('/desserts/:dessertId', verifyToken, dessertController.deleteDesserts)

module.exports = router