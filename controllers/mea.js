require('../config/db')
const Meas = require('../models/mea')
const measValidation = require('../validations/meas')
const authController = require('./auth')

// findAllMeas
exports.findAllMeas = async(req, res) => {
    try {
        
        const dataMeas = await Meas.aggregate([
            {
                $match: { active: true }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ])
        
        const message = `fetched ${dataMeas.length} Meas`

        res.status(201).json({
            message: message,
            data: dataMeas
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findMeas
exports.findMeas = async (req, res) => {

    try {
        const dataMeas = await Meas.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataMeas.length} Meas`

        res.status(201).json({
            message: message,
            data: dataMeas
        })
        // console.log(dataMeas)
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createMeas
exports.createMeas = async (req, res) => {
    try {
        // console.log(req.body)
        let message

        // validate request
        await measValidation.createMeas(req.body)

        const dataMea = await Meas.create(req.body)

        const username = await authController.getUsername(req.user._id)

        message = `Mea ${dataMea.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataMea
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

// updateMeas
exports.updateMeas = async (req, res) => {

    try {
        const reqData = {
            name: req.body.name,
            active: req.body.active,
        }

        const username = await authController.getUsername(req.user._id)
        
        const meas = await Meas.findById(req.params.meaId)
        let message
        
        if (!meas) {
            message = `Mea not Found`
            res.json({
                status: "error",
                message: error.message,
            }).status(400)
        } else {
                await measValidation.createMeas(reqData)
                await Meas.updateOne({ _id: req.params.meaId }, reqData)
            if (meas.name === req.body.name) {
                message = `Mea ${meas.name} updated successfully`
            } else {
                const updatedMeas = await Meas.findById(req.params.meaId)
                message = `Mea ${meas.name} updated to ${updatedMeas.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: meas,
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

// deleteMeas
exports.deleteMeas = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedMeas = await Meas.findById(req.params.meaId)
        let message
        
        if (!deletedMeas) {
            message = `Mea not found`
        } else {
            await Meas.deleteOne({ _id: req.params.meaId })
            message = `Mea ${deletedMeas.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedMeas
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