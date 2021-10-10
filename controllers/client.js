require('../config/db')
const Clients = require('../models/client')
const clientsValidation = require('../validations/clients')
const authController = require('./auth')
const fs = require('fs')

// findAllClients
exports.findAllClients = async(req, res) => {
    try {
        
        const dataClients = await Clients.aggregate([
            {
                $match: { active: true }
            },
            {
                $project : { name : 1, period : 1, numberOfParticipants : 1, image : 1, article: 1, instagram: 1 }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ])

        // console.log(dataClients)

        const message = `fetched ${dataClients.length} Clients`

        res.status(201).json({
            message: message,
            data: dataClients,
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findClients
exports.findClients = async (req, res) => {

    try {
        const dataClients = await Clients.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataClients.length} Clients`

        res.status(201).json({
            message: message,
            data: dataClients
        })
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createClients
exports.createClients = async (req, res) => {
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
            period: req.body.period,
            numberOfParticipants: req.body.numberOfParticipants,
            article: req.body.article,
            instagram: req.body.instagram,
            image: req.file.path,
            active: req.body.active,
        }
        // validate request
        await clientsValidation.createClients(reqData)

        const dataClient = await Clients.create(reqData)

        const username = await authController.getUsername(req.user._id)

        message = `Client ${dataClient.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataClient
        }).status(201)
        console.log(`${message} by ${username}`)
        if (req.file) {
            console.log(`Image of ${dataClient.name} (${dataClient.image}) added successfully by ${username}`)
        }
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}

// updateClients
exports.updateClients = async (req, res) => {

    try {
        const username = await authController.getUsername(req.user._id)
        
        const clients = await Clients.findById(req.params.clientId)
        let message
        
        if (!clients) {
            message = `Client not Found`
        } else {
            if (req.file) {
                const reqData = {
                    name: req.body.name,
                    period: req.body.period,
                    numberOfParticipants: req.body.numberOfParticipants,
                    article: req.body.article,
                    instagram: req.body.instagram,
                    image: req.file.path,
                    active: req.body.active,
                }
                // validate request
                await clientsValidation.createClients(reqData)
                await Clients.updateOne({ _id: req.params.clientId }, reqData)
                try {
                    fs.unlinkSync(client.image)
                } catch(err) {
                    console.error(err)
                }
            } else {
                // validate request
                await clientsValidation.updateClients(req.body)
                await Clients.updateOne({ _id: req.params.clientId }, {
                    name: req.body.name,
                    period: req.body.period,
                    numberOfParticipants: req.body.numberOfParticipants,
                    article: req.body.article,
                    instagram: req.body.instagram,
                    active: req.body.active,
                })
            }
            if (clients.name === req.body.name) {
                message = `Client ${clients.name} updated successfully`
            } else {
                const updatedClients = await Clients.findById(req.params.clientId)
                message = `Client ${clients.name} updated to ${updatedClients.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: clients,
        }).status(201)
        console.log(`${message} by ${username}`)
        if (req.file) {
            const updatedClients = await Clients.findById(req.params.clientId)
            console.log(`${clients.image} removed and ${updatedClients.image} added successfully by ${username}`)
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

// deleteClients
exports.deleteClients = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedClients = await Clients.findById(req.params.clientId)
        let message
        
        if (!deletedClients) {
            message = `Client not found`
        } else {
            await Clients.deleteOne({ _id: req.params.clientId })
            try {
                fs.unlinkSync(deletedClients.image)
            } catch(err) {
                console.error(err)
            }
            message = `Client ${deletedClients.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedClients
        }).status(201)
        console.log(`${message} by ${username}`)
        console.log(`Image of ${deletedClients.name} (${deletedClients.image}) removed successfully by ${username}`)
    } catch (error) {
        res.json({
            status:"error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}