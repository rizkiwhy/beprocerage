require('../config/db')
const Privileges = require('../models/privilege')
const privilegesValidation = require('../validations/privileges')
const authController = require('./auth')

// findAllPrivileges
exports.findAllPrivileges = async(req, res) => {
    try {
        
        const dataPrivileges = await Privileges.aggregate([
            {
                $match: { active: true }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ]).limit(6)
        
        const message = `fetched ${dataPrivileges.length} Privileges`

        res.status(201).json({
            message: message,
            data: dataPrivileges
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findPrivileges
exports.findPrivileges = async (req, res) => {

    try {
        const dataPrivileges = await Privileges.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataPrivileges.length} Privileges`

        res.status(201).json({
            message: message,
            data: dataPrivileges
        })
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createPrivileges
exports.createPrivileges = async (req, res) => {
    try {
        // console.log(req.body)
        let message

        // validate request
        await privilegesValidation.createPrivileges(req.body)

        const dataPrivilege = await Privileges.create(req.body)

        const username = await authController.getUsername(req.user._id)

        message = `Privilege ${dataPrivilege.title} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataPrivilege
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

// updatePrivileges
exports.updatePrivileges = async (req, res) => {

    try {
        
        const reqData = {
            title: req.body.title,
            description: req.body.description,
            icon: req.body.icon,
            active: req.body.active
        }

        const username = await authController.getUsername(req.user._id)
        
        const privileges = await Privileges.findById(req.params.privilegeId)
        let message
        
        if (!privileges) {
            message = `Privilege not Found`
            res.json({
                status: "error",
                message: error.message,
            }).status(400)
        } else {
                await privilegesValidation.createPrivileges(reqData)
                await Privileges.updateOne({ _id: req.params.privilegeId }, reqData)
            if (privileges.title === req.body.title) {
                message = `Privilege ${privileges.title} updated successfully`
            } else {
                const updatedPrivileges = await Privileges.findById(req.params.privilegeId)
                message = `Privilege ${privileges.title} updated to ${updatedPrivileges.title} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: privileges,
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

// deletePrivileges
exports.deletePrivileges = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedPrivileges = await Privileges.findById(req.params.privilegeId)
        let message
        
        if (!deletedPrivileges) {
            message = `Privilege not found`
        } else {
            await Privileges.deleteOne({ _id: req.params.privilegeId })
            message = `Privilege ${deletedPrivileges.title} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedPrivileges
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