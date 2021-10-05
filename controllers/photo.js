require('../config/db')
const Photos = require('../models/photo')
const photosValidation = require('../validations/photos')
const authController = require('./auth')
const fs = require('fs')

// findAllPhotos
exports.findAllPhotos = async(req, res) => {
    try {
        
        const dataPhotos = await Photos.aggregate([
            {
                $match: { active: true }
            },
            {
                $project : { name : 1, image : 1, width : 1, }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const message = `fetched ${dataPhotos.length} Photos`

        res.status(201).json({
            message: message,
            data: dataPhotos,
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findPhotos
exports.findPhotos = async (req, res) => {

    try {
        const dataPhotos = await Photos.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataPhotos.length} Photos`

        res.status(201).json({
            message: message,
            data: dataPhotos
        })
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createPhotos
exports.createPhotos = async (req, res) => {
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
            width: req.body.width,
            image: req.file.path,
            active: req.body.active,
        }
        // validate request
        await photosValidation.createPhotos(reqData)

        const dataPhoto = await Photos.create(reqData)

        const username = await authController.getUsername(req.user._id)

        message = `Photo ${dataPhoto.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataPhoto
        }).status(201)
        console.log(`${message} by ${username}`)
        if (req.file) {
            console.log(`Image of ${dataPhoto.name} (${dataPhoto.image}) added successfully by ${username}`)
        }
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}

// updatePhotos
exports.updatePhotos = async (req, res) => {

    try {
        const username = await authController.getUsername(req.user._id)
        
        const photos = await Photos.findById(req.params.photoId)
        let message
        
        if (!photos) {
            message = `Photo not Found`
        } else {
            if (req.file) {
                const reqData = {
                    name: req.body.name,
                    width: req.body.width,
                    active: req.body.active,
                    image: req.file.path
                }
                // validate request
                await photosValidation.createPhotos(reqData)
                await Photos.updateOne({ _id: req.params.photoId }, reqData)
                try {
                    fs.unlinkSync(photos.image)
                } catch(err) {
                    console.error(err)
                }
            } else {
                // validate request
                await photosValidation.updatePhotos(req.body)
                await Photos.updateOne({ _id: req.params.photoId }, {
                    name: req.body.name,
                    width: req.body.width,
                    active: req.body.active,
                })
            }
            if (photos.name === req.body.name) {
                message = `Photo ${photos.name} updated successfully`
            } else {
                const updatedPhotos = await Photos.findById(req.params.photoId)
                message = `Photo ${photos.name} updated to ${updatedPhotos.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: photos,
        }).status(201)
        console.log(`${message} by ${username}`)
        if (req.file) {
            const updatedPhotos = await Photos.findById(req.params.photoId)
            console.log(`${photos.image} removed and ${updatedPhotos.image} added successfully by ${username}`)
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

// deletePhotos
exports.deletePhotos = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedPhotos = await Photos.findById(req.params.photoId)
        let message
        
        if (!deletedPhotos) {
            message = `Photos not found`
        } else {
            await Photos.deleteOne({ _id: req.params.photoId })
            try {
                fs.unlinkSync(deletedPhotos.image)
            } catch(err) {
                console.error(err)
            }
            message = `Photo ${deletedPhotos.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedPhotos
        }).status(201)
        console.log(`${message} by ${username}`)
        console.log(`Image of ${deletedPhotos.name} (${deletedPhotos.image}) removed successfully by ${username}`)
    } catch (error) {
        res.json({
            status:"error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}