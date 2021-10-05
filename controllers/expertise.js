require('../config/db')
const Expertises = require('../models/expertise')
const Certifications = require('../models/certification')
const expertisesValidation = require('../validations/expertises')
const authController = require('../controllers/auth')
const fs = require('fs')

// findAllExpertises
exports.findAllExpertises = async(req, res) => {
    try {
        
        const dataExpertises = await Expertises.aggregate([
            {
                $match: { active: true }
            },
            {
                $project : { name : 1, image : 1, abbr: 1, icon: 1 }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ])

        let dataCertifications
        for (let index = 0; index < dataExpertises.length; index++) {
            dataCertifications = await Certifications.aggregate([
                {
                    $match: { tags: dataExpertises[index].abbr }
                },
                {
                    $sort: { level: 1 }
                }
            ])
            dataExpertises[index].item = dataCertifications
        }

        const message = `fetched ${dataExpertises.length} Expertises`

        res.status(201).json({
            message: message,
            data: dataExpertises,
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findExpertises
exports.findExpertises = async (req, res) => {

    try {
        const dataExpertises = await Expertises.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataExpertises.length} Expertises`

        res.status(201).json({
            message: message,
            data: dataExpertises
        })
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createExpertises
exports.createExpertises = async (req, res) => {
    try {
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
            icon: req.body.icon,
            abbr: req.body.abbr,
            image: req.file.path,
            active: req.body.active,
        }
        // console.log(req.file.path)
        // validate request
        await expertisesValidation.createExpertises(reqData)

        const dataExpertise = await Expertises.create(reqData)

        const username = await authController.getUsername(req.user._id)

        message = `Expertise ${dataExpertise.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataExpertise
        }).status(201)
        console.log(`${message} by ${username}`)
        if (req.file) {
            console.log(`Image of ${dataExpertise.name} (${dataExpertise.image}) added successfully by ${username}`)
        }
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}

// updateExpertises
exports.updateExpertises = async (req, res) => {

    try {
        const username = await authController.getUsername(req.user._id)
        
        const expertises = await Expertises.findById(req.params.expertiseId)
        let message
        
        if (!expertises) {
            message = `Expertise not Found`
        } else {
            if (req.file) {
                const reqData = {
                    name: req.body.name,
                    icon: req.body.icon,
                    abbr: req.body.abbr,
                    active: req.body.active,
                    image: req.file.path
                }
                // validate request
                await expertisesValidation.createExpertises(reqData)
                await Expertises.updateOne({ _id: req.params.expertiseId }, reqData)
                try {
                    fs.unlinkSync(expertises.image)
                } catch(err) {
                    console.error(err)
                }
            } else {
                // validate request
                await expertisesValidation.updateExpertises(req.body)
                await Expertises.updateOne({ _id: req.params.expertiseId }, {
                    name: req.body.name,
                    icon: req.body.icon,
                    abbr: req.body.abbr,
                    active: req.body.active,
                })
            }
            if (expertises.name === req.body.name) {
                message = `Expertise ${expertises.name} updated successfully`
            } else {
                const updatedExpertises = await Expertises.findById(req.params.expertiseId)
                message = `Expertise ${expertises.name} updated to ${updatedExpertises.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: expertises,
        }).status(201)
        console.log(`${message} by ${username}`)
        if (req.file) {
            const updatedExpertises = await Expertises.findById(req.params.expertiseId)
            console.log(`${expertises.image} removed and ${updatedExpertises.image} added successfully by ${username}`)
            // console.log(`Image of ${req.body.name} (${req.file.path}) added successfully by ${username}`)
        }
        if (req.file) {
        }
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}

// deleteExpertises
exports.deleteExpertises = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedExpertises = await Expertises.findById(req.params.expertiseId)
        let message
        
        if (!deletedExpertises) {
            message = `Expertises not found`
        } else {
            await Expertises.deleteOne({ _id: req.params.expertiseId })
            try {
                fs.unlinkSync(deletedExpertises.image)
            } catch(err) {
                console.error(err)
            }
            message = `Expertise ${deletedExpertises.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedExpertises
        }).status(201)
        console.log(`${message} by ${username}`)
        console.log(`Image of ${deletedExpertises.name} (${deletedExpertises.image}) removed successfully by ${username}`)
    } catch (error) {
        res.json({
            status:"error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}