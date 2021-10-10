require('../config/db')
const Competencyunits = require('../models/competencyunit')
const competencyunitsValidation = require('../validations/competencyunits')
const authController = require('./auth')

// findAllCompetencyunits
exports.findAllCompetencyunits = async(req, res) => {
    try {
        
        const dataCompetencyunits = await Competencyunits.aggregate([
            {
                $match: { active: true }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ])
        
        const message = `fetched ${dataCompetencyunits.length} Competency units`

        res.status(201).json({
            message: message,
            data: dataCompetencyunits
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findCompetencyunits
exports.findCompetencyunits = async (req, res) => {

    try {
        const dataCompetencyunits = await Competencyunits.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataCompetencyunits.length} Competency units`

        res.status(201).json({
            message: message,
            data: dataCompetencyunits
        })
        // console.log(dataCompetencyunits)
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createCompetencyunits
exports.createCompetencyunits = async (req, res) => {
    try {
        // console.log(req.body)
        let message

        // validate request
        await competencyunitsValidation.createCompetencyunits(req.body)

        const dataCompetencyunit = await Competencyunits.create(req.body)

        const username = await authController.getUsername(req.user._id)

        message = `Competency unit ${dataCompetencyunit.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataCompetencyunit
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

// updateCompetencyunits
exports.updateCompetencyunits = async (req, res) => {

    try {
        const reqData = {
            name: req.body.name,
            description: req.body.description,
            numberOfMeetings: req.body.numberOfMeetings,
            tags: req.body.tags,
            level: req.body.level,
            active: req.body.active,
        }

        const username = await authController.getUsername(req.user._id)
        
        const competencyunits = await Competencyunits.findById(req.params.competencyunitId)
        let message
        
        if (!competencyunits) {
            message = `Competency unit not Found`
            res.json({
                status: "error",
                message: error.message,
            }).status(400)
        } else {
                await competencyunitsValidation.createCompetencyunits(reqData)
                await Competencyunits.updateOne({ _id: req.params.competencyunitId }, reqData)
            if (competencyunits.name === req.body.name) {
                message = `Competency unit ${competencyunits.name} updated successfully`
            } else {
                const updatedCompetencyunits = await Competencyunits.findById(req.params.competencyunitId)
                message = `Competency unit ${competencyunits.name} updated to ${updatedCompetencyunits.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: competencyunits,
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

// deleteCompetencyunits
exports.deleteCompetencyunits = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedCompetencyunits = await Competencyunits.findById(req.params.competencyunitId)
        let message
        
        if (!deletedCompetencyunits) {
            message = `Competency unit not found`
        } else {
            await Competencyunits.deleteOne({ _id: req.params.competencyunitId })
            message = `Competency unit ${deletedCompetencyunits.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedCompetencyunits
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