require('../config/db')
const Categories = require('../models/category')
const categoriesValidation = require('../validations/categories')
const authController = require('./auth')

// findAllCategories
exports.findAllCategories = async(req, res) => {
    try {
        
        const dataCategories = await Categories.aggregate([
            {
                $match: { active: true }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ])
        
        const message = `fetched ${dataCategories.length} Categories`

        res.status(201).json({
            message: message,
            data: dataCategories
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findCategories
exports.findCategories = async (req, res) => {

    try {
        const dataCategories = await Categories.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataCategories.length} Categories`

        res.status(201).json({
            message: message,
            data: dataCategories
        })
        // console.log(dataCategories)
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createCategories
exports.createCategories = async (req, res) => {
    try {
        // console.log(req.body)
        let message

        // validate request
        await categoriesValidation.createCategories(req.body)

        const dataCategory = await Categories.create(req.body)

        const username = await authController.getUsername(req.user._id)

        message = `Category ${dataCategory.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataCategory
        }).status(201)
        console.log(`${message} by ${username}`)
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}

// updateCategories
exports.updateCategories = async (req, res) => {

    try {
        const reqData = {
            name: req.body.name,
            active: req.body.active,
        }

        const username = await authController.getUsername(req.user._id)
        
        const categories = await Categories.findById(req.params.categoryId)
        let message
        
        if (!categories) {
            message = `Category not Found`
            res.json({
                status: "error",
                message: error.message,
            }).status(400)
        } else {
                await categoriesValidation.createCategories(reqData)
                await Categories.updateOne({ _id: req.params.categoryId }, reqData)
            if (categories.name === req.body.name) {
                message = `Category ${categories.name} updated successfully`
            } else {
                const updatedCategories = await Categories.findById(req.params.categoryId)
                message = `Category ${categories.name} updated to ${updatedCategories.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: categories,
        }).status(201)
        console.log(`${message} by ${username}`)
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}

// deleteCategories
exports.deleteCategories = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedCategories = await Categories.findById(req.params.categoryId)
        let message
        
        if (!deletedCategories) {
            message = `Category not found`
        } else {
            await Categories.deleteOne({ _id: req.params.categoryId })
            message = `Category ${deletedCategories.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedCategories
        }).status(201)
        console.log(`${message} by ${username}`)
    } catch (error) {
        res.json({
            status:"error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}