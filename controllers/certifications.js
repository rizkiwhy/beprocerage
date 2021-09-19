require('../config/db')
const Certifications = require('../models/certification')
const certificationsValidation = require('../validations/certifications')
const authController = require('./auth')

// findAllCertifications
exports.findAllCertifications = async(req, res) => {
    try {
        
        const dataCertifications = await Certifications.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])
        
        const message = `fetched ${dataCertifications.length} Certifications`

        res.status(201).json({
            message: message,
            data: dataCertifications
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findCertifications
exports.findCertifications = async (req, res) => {

    try {
        const dataCertifications = await Certifications.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataCertifications.length} Certifications`

        res.status(201).json({
            message: message,
            data: dataCertifications
        })
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createCertifications
exports.createCertifications = async (req, res) => {
    try {
        let message

        // validate request
        await certificationsValidation.createCertifications(req.body)

        const dataCertification = await Certifications.create(req.body)

        const username = await authController.getUsername(req.user._id)

        message = `Certification ${dataCertification.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataCertification
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

// updateCertifications
exports.updateCertifications = async (req, res) => {

    try {
        const reqData = {
            name: req.body.name,
            description: req.body.description,
            numberOfMeetings: req.body.numberOfMeetings,
            tags: req.body.tags,
            level: req.body.level
        }

        const username = await authController.getUsername(req.user._id)
        
        const certifications = await Certifications.findById(req.params.certificationId)
        let message
        
        if (!certifications) {
            message = `Certification not Found`
        } else {
                await certificationsValidation.createCertifications(reqData)
                await Certifications.updateOne({ _id: req.params.certificationId }, reqData)
            if (certifications.name === req.body.name) {
                message = `Certification ${certifications.name} updated successfully`
            } else {
                const updatedCertifications = await Certifications.findById(req.params.certificationsId)
                message = `Certification ${certifications.name} updated to ${updatedCertifications.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: certifications,
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

// deleteCertifications
exports.deleteCertifications = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedCertifications = await Certifications.findById(req.params.certificationId)
        let message
        
        if (!deletedCertifications) {
            message = `Certification not found`
        } else {
            await Certifications.deleteOne({ _id: req.params.certificationId })
            message = `Certification ${deletedCertifications.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedCertifications
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