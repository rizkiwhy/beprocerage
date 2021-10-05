require('../config/db')
const socialmedia = require('../models/socialmedia')
const SocialMedias = require('../models/socialmedia')
const socialmediasValidation = require('../validations/socialmedias')
const authController = require('./auth')

// findAllSocialMedias
exports.findAllSocialMedias = async(req, res) => {
    try {
        
        const dataSocialMedias = await SocialMedias.aggregate([
            {
                $match: { active: true }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ]).limit(6)
        
        const message = `fetched ${dataSocialMedias.length} SocialMedias`

        res.status(201).json({
            message: message,
            data: dataSocialMedias
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findSocialMedias
exports.findSocialMedias = async (req, res) => {

    try {
        const dataSocialMedias = await SocialMedias.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataSocialMedias.length} Social Medias`

        res.status(201).json({
            message: message,
            data: dataSocialMedias
        })
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createSocialMedias
exports.createSocialMedias = async (req, res) => {
    try {
        let message

        // validate request
        await socialmediasValidation.createSocialMedias(req.body)

        const dataSocialMedia = await SocialMedias.create(req.body)

        const username = await authController.getUsername(req.user._id)

        message = `Social Media ${dataSocialMedia.type} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataSocialMedia
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

// updateSocialMedias
exports.updateSocialMedias = async (req, res) => {

    try {
        
        const reqData = {
            type: req.body.type,
            value: req.body.value,
            icon: req.body.icon,
            link: req.body.link,
            active: req.body.active
        }

        const username = await authController.getUsername(req.user._id)
        
        const socialmedias = await SocialMedias.findById(req.params.socialmediaId)
        let message
        
        if (!socialmedias) {
            message = `Contact not Found`
            res.json({
                status: "error",
                message: error.message,
            }).status(400)
        } else {
                await socialmediasValidation.createSocialMedias(reqData)
                await SocialMedias.updateOne({ _id: req.params.socialmediaId }, reqData)
            if (socialmedias.type === req.body.type) {
                message = `Contact ${socialmedias.type} updated successfully`
            } else {
                const updatedSocialMedias = await SocialMedias.findById(req.params.socialmediaId)
                message = `Contact ${socialmedias.type} updated to ${updatedSocialMedias.type} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: socialmedias,
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

// deleteSocialMedias
exports.deleteSocialMedias = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedSocialMedias = await SocialMedias.findById(req.params.socialmediaId)
        let message
        
        if (!deletedSocialMedias) {
            message = `Contact not found`
        } else {
            await SocialMedias.deleteOne({ _id: req.params.socialmediaId })
            message = `Contact ${deletedSocialMedias.type} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedSocialMedias
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