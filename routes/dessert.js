const express = require('express')
const router = express.Router()
const verify = require('../middleware/verifyToken')

const dessertController = require('../controllers/dessert')

router.get('/desserts', verify, dessertController.findDesserts)
router.post('/desserts', verify, dessertController.createDesserts)
router.put('/desserts/:dessertId', verify, dessertController.updateDesserts)
router.delete('/desserts/:dessertId', verify, dessertController.deleteDesserts)

module.exports = router