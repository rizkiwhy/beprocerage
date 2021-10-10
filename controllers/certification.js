require('../config/db')
const Certifications = require('../models/certification')
const certificationsValidation = require('../validations/certifications')
const authController = require('./auth')

// findAllCertifications
exports.findAllCertifications = async(req, res) => {
    try {
        
        const dataCertifications = await Certifications.aggregate([
            {
                $match: { active: true }
            },
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
        // console.log(dataCertifications)
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

        if (!req.file) {
            message = "Image not uploaded"
            res.json({
                status: "error",
                message: message,
            }).status(400)
            console.log(`error: ${message}`)
        }

        const reqData = {
            code: req.body.code,
            name: req.body.name,
            tags: req.body.tags,
            category: req.body.category,
            mea: req.body.mea,
            field: req.body.field,
            image: req.file.path,
            active: req.body.active,
        }

        // validate request
        await certificationsValidation.createCertifications(reqData)

        const dataCertification = await Certifications.create(reqData)

        const username = await authController.getUsername(req.user._id)

        message = `Schema ${dataCertification.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataCertification
        }).status(201)
        console.log(`${message} by ${username}`)
        if (req.file) {
            console.log(`Image of ${dataCertification.name} (${dataCertification.image}) added successfully by ${username}`)
        }
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

        console.log(req)

        const username = await authController.getUsername(req.user._id)
        
        const certifications = await Certifications.findById(req.params.certificationId)
        let message
        
        if (!certifications) {
            message = `Schema not Found`
            res.json({
                status: "error",
                message: error.message,
            }).status(400)
        } else {
            if (req.file) {
                const reqData = {
                    code: req.body.code,
                    name: req.body.name,
                    tags: req.body.tags,
                    category: req.body.category,
                    mea: req.body.mea,
                    field: req.body.field,
                    image: req.file.path,
                    active: req.body.active,
                }
                // validate request
                await certificationsValidation.createCertifications(reqData)
                await Certifications.updateOne({ _id: req.params.certificationId }, reqData)
                try {
                    fs.unlinkSync(certifications.image)
                } catch(err) {
                    console.error(err)
                }
            } else {
                // validate request
                await certificationsValidation.updateCertifications(req.body)
                await Certifications.updateOne({ _id: req.params.certificationId }, {
                    code: req.body.code,
                    name: req.body.name,
                    tags: req.body.tags,
                    category: req.body.category,
                    mea: req.body.mea,
                    field: req.body.field,
                    active: req.body.active,
                })
            }
            if (certifications.name === req.body.name) {
                message = `Certification ${certifications.name} updated successfully`
            } else {
                const updatedCertifications = await Certifications.findById(req.params.certificationId)
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
            message = `Schema not found`
        } else {
            await Certifications.deleteOne({ _id: req.params.certificationId })
            try {
                fs.unlinkSync(certifications.image)
            } catch(err) {
                console.error(err)
            }
            message = `Schema ${deletedCertifications.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedCertifications
        }).status(201)
        console.log(`${message} by ${username}`)
        console.log(`Image of ${deletedCertifications.name} (${deletedCertifications.image}) removed successfully by ${username}`)
    } catch (error) {
        res.json({
            status:"error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}