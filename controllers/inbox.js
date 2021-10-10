require('../config/db')
const Inbox = require('../models/inbox')
const inboxValidation = require('../validations/inbox')
const authController = require('./auth')

// newInbox
exports.newInbox = async (req, res) => {
    try {
        // console.log(req.body)
        let message

        // validate request
        await inboxValidation.createInbox(req.body)

        const dataInbox = await Inbox.create(req.body)

        // const username = await authController.getUsername(req.user._id)

        message = `Inbox ${dataInbox.message} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataInbox
        }).status(201)
        console.log(`${message}`)
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}

// findInbox
exports.findInbox = async (req, res) => {

    try {
        const dataInbox = await Inbox.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataInbox.length} Inbox`

        res.status(201).json({
            message: message,
            data: dataInbox
        })
        // console.log(dataInbox)
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createInbox
exports.createInbox = async (req, res) => {
    try {
        // console.log(req.body)
        let message

        // validate request
        await inboxValidation.createInbox(req.body)

        const dataInbox = await Inbox.create(req.body)

        const username = await authController.getUsername(req.user._id)

        message = `Inbox ${dataInbox.message} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataInbox
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

// updateInbox
exports.updateInbox = async (req, res) => {

    try {
        const reqData = {
            name: req.body.name,
            email: req.body.email,
            notelp: req.body.notelp,
            subject: req.body.subject,
            message: req.body.message,
        }

        const username = await authController.getUsername(req.user._id)
        
        const inbox = await Inbox.findById(req.params.inboxId)
        let message
        
        if (!inbox) {
            message = `Inbox not Found`
            res.json({
                status: "error",
                message: error.message,
            }).status(400)
        } else {
                await inboxValidation.createInbox(reqData)
                await Inbox.updateOne({ _id: req.params.inboxId }, reqData)
            if (inbox.name === req.body.name) {
                message = `Inbox ${inbox.name} updated successfully`
            } else {
                const updatedInbox = await Inbox.findById(req.params.inboxId)
                message = `Inbox ${inbox.name} updated to ${updatedInbox.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: inbox,
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

// deleteInbox
exports.deleteInbox = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedInbox = await Inbox.findById(req.params.inboxId)
        let message
        
        if (!deletedInbox) {
            message = `Inbox not found`
        } else {
            await Inbox.deleteOne({ _id: req.params.inboxId })
            message = `Inbox ${deletedInbox.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedInbox
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