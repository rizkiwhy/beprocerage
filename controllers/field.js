require('../config/db')
const Fields = require('../models/field')
const fieldsValidation = require('../validations/fields')
const authController = require('./auth')

// findAllFields
exports.findAllFields = async(req, res) => {
    try {
        
        const dataFields = await Fields.aggregate([
            {
                $match: { active: true }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ])
        
        const message = `fetched ${dataFields.length} Fields`

        res.status(201).json({
            message: message,
            data: dataFields
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findFields
exports.findFields = async (req, res) => {

    try {
        const dataFields = await Fields.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataFields.length} Fields`

        res.status(201).json({
            message: message,
            data: dataFields
        })
        // console.log(dataFields)
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createFields
exports.createFields = async (req, res) => {
    try {
        // console.log(req.body)
        let message

        // validate request
        await fieldsValidation.createFields(req.body)

        const dataField = await Fields.create(req.body)

        const username = await authController.getUsername(req.user._id)

        message = `Field ${dataField.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataField
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

// updateFields
exports.updateFields = async (req, res) => {

    try {
        const reqData = {
            name: req.body.name,
            active: req.body.active,
        }

        const username = await authController.getUsername(req.user._id)
        
        const fields = await Fields.findById(req.params.fieldId)
        let message
        
        if (!fields) {
            message = `Field not Found`
            res.json({
                status: "error",
                message: error.message,
            }).status(400)
        } else {
                await fieldsValidation.createFields(reqData)
                await Fields.updateOne({ _id: req.params.fieldId }, reqData)
            if (fields.name === req.body.name) {
                message = `Field ${fields.name} updated successfully`
            } else {
                const updatedFields = await Fields.findById(req.params.fieldId)
                message = `Field ${fields.name} updated to ${updatedFields.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: fields,
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

// deleteFields
exports.deleteFields = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedFields = await Fields.findById(req.params.fieldId)
        let message
        
        if (!deletedFields) {
            message = `Field not found`
        } else {
            await Fields.deleteOne({ _id: req.params.fieldId })
            message = `Field ${deletedFields.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedFields
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