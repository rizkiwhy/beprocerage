require('../config/db')
const Assesors = require('../models/assesor')
const assesorsValidation = require('../validations/assesors')
const authController = require('../controllers/auth')
const fs = require('fs')

// findAllAssesors
exports.findAllAssesors = async(req, res) => {
    try {
        
        const dataAssesors = await Assesors.aggregate([
            {
                $match: { active: true }
            },
            {
                $project : { name : 1, tags : 1, degree: 1, graduateOf: 1, image: 1, quote: 1 }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const message = `fetched ${dataAssesors.length} Assesors`

        res.status(201).json({
            message: message,
            data: dataAssesors,
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findAssesors
exports.findAssesors = async (req, res) => {

    try {
        const dataAssesors = await Assesors.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataAssesors.length} Assesors`

        res.status(201).json({
            message: message,
            data: dataAssesors
        })
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createAssesors
exports.createAssesors = async (req, res) => {
    try {
        // console.log(req.body)
        let message

        if (!req.file) {
            message = "Image not uploaded"
            res.json({
                status: "error",
                message: message,
            }).status(400)
            console.log(`error: ${message}`)
        }
        const reqData = {
            name: req.body.name,
            tags: req.body.tags,
            degree: req.body.degree,
            graduateOf: req.body.graduateOf,
            quote: req.body.quote,
            active: req.body.active,
            image: req.file.path
        }
        // validate request
        await assesorsValidation.createAssesors(reqData)

        const dataAssesor = await Assesors.create(reqData)

        const username = await authController.getUsername(req.user._id)

        message = `Assesor ${dataAssesor.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataAssesor
        }).status(201)
        console.log(`${message} by ${username}`)
        if (req.file) {
            console.log(`Image of ${dataAssesor.name} (${dataAssesor.image}) added successfully by ${username}`)
        }
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}

// updateAssesors
exports.updateAssesors = async (req, res) => {

    try {

        const username = await authController.getUsername(req.user._id)
        
        const assesors = await Assesors.findById(req.params.assesorId)
        let message
        
        if (!assesors) {
            message = `Assesor not Found`
        } else {
            if (req.file) {
                const reqData = {
                    name: req.body.name,
                    tags: req.body.tags,
                    degree: req.body.degree,
                    graduateOf: req.body.graduateOf,
                    quote: req.body.quote,
                    active: req.body.active,
                    image: req.file.path
                }
                // validate request
                await assesorsValidation.createAssesors(reqData)
                await Assesors.updateOne({ _id: req.params.assesorId }, reqData)
                try {
                    fs.unlinkSync(assesors.image)
                } catch(err) {
                    console.error(err)
                }
            } else {
                // validate request
                await assesorsValidation.updateAssesors(req.body)
                await Assesors.updateOne({ _id: req.params.assesorId }, {
                    name: req.body.name,
                    tags: req.body.tags,
                    degree: req.body.degree,
                    graduateOf: req.body.graduateOf,
                    quote: req.body.quote,
                    active: req.body.active,
                })
            }
            if (assesors.name === req.body.name) {
                message = `Assesor ${assesors.name} updated successfully`
            } else {
                const updatedAssesors = await Assesors.findById(req.params.assesorId)
                message = `Assesor ${assesors.name} updated to ${updatedAssesors.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: assesors,
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

// deleteAssesors
exports.deleteAssesors = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedAssesors = await Assesors.findById(req.params.assesorId)
        let message
        
        if (!deletedAssesors) {
            message = `Assesor not found`
        } else {
            await Assesors.deleteOne({ _id: req.params.assesorId })
            message = `Assesor ${deletedAssesors.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedAssesors
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