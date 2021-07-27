require('../config/db')
const Desserts = require('../models/dessert')

// findDesserts
exports.findDesserts = async (req, res) => {

    try {
        // const dataDesserts = await Desserts.find()
        const dataDesserts = await Desserts.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])
        const message = `${dataDesserts.length} Desserts fetched`

        res.status(201).json({
            message: message,
            data: dataDesserts,
            // user: req.user
        })
        console.log(message)
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

// createDesserts
exports.createDesserts = async (req, res) => {

    try {
        const dataDesserts = await Desserts.create({
            name: req.body.name,
            calories: req.body.calories,
            fat: req.body.fat,
            carbs: req.body.carbs,
            protein: req.body.protein
        })
        const message = `Dessert ${dataDesserts.name} was created successfully`

        res.status(201).json({
            message: message,
            data: dataDesserts
        })
        console.log(message)
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

// updateDesserts
exports.updateDesserts = async (req, res) => {

    try {
        await Desserts.updateOne({ _id: req.params.dessertId }, {
            name: req.body.name,
            calories: req.body.calories,
            fat: req.body.fat,
            carbs: req.body.carbs,
            protein: req.body.protein
        })
        const updatedDesserts = await Desserts.findById(req.params.dessertId)
        let message

        !updatedDesserts ?
            message = `Dessert not Found` :
            message = `Dessert ${updatedDesserts.name} was updated successfully`

        res.status(201).json({
            message: message,
            data: updatedDesserts
        })
        console.log(message)
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

// deleteDesserts
exports.deleteDesserts = async (req, res) => {
    try {
        const deletedDesserts = await Desserts.findById(req.params.dessertId)
        await Desserts.deleteOne({ _id: req.params.dessertId })
        let message

        !deletedDesserts ?
            message = `Desserts not found` :
            message = `Dessert ${deletedDesserts.name} was deleted successfully`

        res.status(201).json({
            message: message,
            data: deletedDesserts
        })
        console.log(message)
    } catch (error) {
        console.log(`error: ${error}`)
    }
}