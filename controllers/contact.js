require('../config/db')
const Contacts = require('../models/contact')
const contactsValidation = require('../validations/contacts')
const authController = require('./auth')

// findAllContacts
exports.findAllContacts = async(req, res) => {
    try {
        
        const dataContacts = await Contacts.aggregate([
            {
                $match: { active: true }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ]).limit(6)
        
        const message = `fetched ${dataContacts.length} Contacts`

        res.status(201).json({
            message: message,
            data: dataContacts
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findContacts
exports.findContacts = async (req, res) => {

    try {
        const dataContacts = await Contacts.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataContacts.length} Contacts`

        res.status(201).json({
            message: message,
            data: dataContacts
        })
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createContacts
exports.createContacts = async (req, res) => {
    try {
        let message

        // validate request
        await contactsValidation.createContacts(req.body)

        const dataContact = await Contacts.create(req.body)

        const username = await authController.getUsername(req.user._id)

        message = `Contact ${dataContact.title} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataContact
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

// updateContacts
exports.updateContacts = async (req, res) => {

    try {
        
        const reqData = {
            key: req.body.key,
            value: req.body.value,
            icon: req.body.icon,
            link: req.body.link,
            active: req.body.active
        }

        const username = await authController.getUsername(req.user._id)
        
        const contacts = await Contacts.findById(req.params.contactId)
        let message
        
        if (!contacts) {
            message = `Contact not Found`
            res.json({
                status: "error",
                message: error.message,
            }).status(400)
        } else {
                await contactsValidation.createContacts(reqData)
                await Contacts.updateOne({ _id: req.params.contactId }, reqData)
            if (contacts.key === req.body.key) {
                message = `Contact ${contacts.key} updated successfully`
            } else {
                const updatedContacts = await Contacts.findById(req.params.contactId)
                message = `Contact ${contacts.key} updated to ${updatedContacts.key} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: contacts,
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

// deleteContacts
exports.deleteContacts = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedContacts = await Contacts.findById(req.params.contactId)
        let message
        
        if (!deletedContacts) {
            message = `Contact not found`
        } else {
            await Contacts.deleteOne({ _id: req.params.contactId })
            message = `Contact ${deletedContacts.key} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedContacts
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