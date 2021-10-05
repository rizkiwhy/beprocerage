require('../config/db')
const Profiles = require('../models/profile')
const profilesValidation = require('../validations/profiles')
const authController = require('./auth')

// findAllProfiles
exports.findAllProfiles = async(req, res) => {
    try {
        
        const dataVisi = await Profiles.aggregate([
            {
                $match: { 
                    category: "Vision",
                    active: true
                }
            },
            {
                $sort: { number: -1 }
            }
        ])

        let element

        for (let index = 0; index < dataVisi.length; index++) {
            element = dataVisi[index].content;   
        }

        const dataMisi = await Profiles.aggregate([
            {
                $match: { 
                    category: "Mission",
                    active: true
                }
            },
            {
                $sort: { number: -1 }
            }
        ])

        const dataSejarah = await Profiles.aggregate([
            {
                $match: { 
                    category: "Sejarah",
                    active: true
                }
            },
            {
                $sort: { number: -1 }
            }
        ])

        
        const message = `fetched ${dataVisi.length} Visions`
        const message1 = `fetched ${dataVisi.length} Missions`
        const message2 = `fetched ${dataVisi.length} Sejarah`
        
        res.status(201).json({
            message: message,
            message1: message1,
            message2: message2,
            dataVisi: element,
            dataMisi: dataMisi,
            dataSejarah: dataSejarah
        })
        // console.log(element)
        console.log(`${message}`)
        console.log(`${message1}`)
        console.log(`${message2}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findProfiles
exports.findProfiles = async (req, res) => {

    try {
        const dataProfiles = await Profiles.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataProfiles.length} Profiles`

        res.status(201).json({
            message: message,
            data: dataProfiles
        })
        // console.log(dataProfiles)
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createProfiles
exports.createProfiles = async (req, res) => {
    try {
        // console.log(req.body)
        let message

        // validate request
        await profilesValidation.createProfiles(req.body)

        const dataProfile = await Profiles.create(req.body)

        const username = await authController.getUsername(req.user._id)

        message = `Profile ${dataProfile.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataProfile
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

// updateProfiles
exports.updateProfiles = async (req, res) => {

    try {
        const reqData = {
            number: req.body.number,
            content: req.body.content,
            category: req.body.category,
            active: req.body.active,
        }

        const username = await authController.getUsername(req.user._id)
        
        const profiles = await Profiles.findById(req.params.profileId)
        let message
        
        if (!profiles) {
            message = `Profile not Found`
            res.json({
                status: "error",
                message: error.message,
            }).status(400)
        } else {
                await profilesValidation.createProfiles(reqData)
                await Profiles.updateOne({ _id: req.params.profileId }, reqData)
            if (profiles.name === req.body.name) {
                message = `Profile ${profiles.name} updated successfully`
            } else {
                const updatedProfiles = await Profiles.findById(req.params.profileId)
                message = `Profile ${profiles.name} updated to ${updatedProfiles.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: profiles,
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

// deleteProfiles
exports.deleteProfiles = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedProfiles = await Profiles.findById(req.params.profileId)
        let message
        
        if (!deletedProfiles) {
            message = `Profile not found`
        } else {
            await Profiles.deleteOne({ _id: req.params.profileId })
            message = `Profile ${deletedProfiles.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedProfiles
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