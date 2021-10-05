require('../config/db')
const Testimonials = require('../models/testimonial')
const testimonialsValidation = require('../validations/testimonials')
const authController = require('./auth')
const fs = require('fs')

// findAllTestimonials
exports.findAllTestimonials = async(req, res) => {
    try {
        
        const dataTestimonials = await Testimonials.aggregate([
            {
                $match: { active: true }
            },
            {
                $project : { name : 1, image : 1, testimonial: 1 }
            },
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const message = `fetched ${dataTestimonials.length} Testimonials`

        // console.log(dataTestimonials)

        res.status(201).json({
            message: message,
            data: dataTestimonials,
        })
        console.log(`${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// findTestimonials
exports.findTestimonials = async (req, res) => {

    try {
        const dataTestimonials = await Testimonials.aggregate([
            {
                $sort: { updatedAt: -1 }
            }
        ])

        const username = await authController.getUsername(req.user._id)
        
        const message = `fetched ${dataTestimonials.length} Testimonials`

        res.status(201).json({
            message: message,
            data: dataTestimonials
        })
        console.log(`${username} ${message}`)
    } catch (error) {
        res.json({
            message: error.message,
        })
        console.log(`error: ${error}`)
    }
}

// createTestimonials
exports.createTestimonials = async (req, res) => {
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
            testimonial: req.body.testimonial,
            image: req.file.path,
            active: req.body.active,
        }
        // console.log(req.file.path)
        // validate request
        await testimonialsValidation.createTestimonials(reqData)

        const dataTestimonial = await Testimonials.create(reqData)

        const username = await authController.getUsername(req.user._id)

        message = `Testimonial ${dataTestimonial.name} created successfully`

        res.json({
            status: "success",
            message: message,
            data: dataTestimonial
        }).status(201)
        console.log(`${message} by ${username}`)
        if (req.file) {
            console.log(`Image of ${dataTestimonial.name} (${dataTestimonial.image}) added successfully by ${username}`)
        }
    } catch (error) {
        res.json({
            status: "error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}

// updateTestimonials
exports.updateTestimonials = async (req, res) => {

    try {
        const username = await authController.getUsername(req.user._id)
        
        const testimonials = await Testimonials.findById(req.params.testimonialId)
        let message
        
        if (!testimonials) {
            message = `Testimonial not Found`
        } else {
            if (req.file) {
                const reqData = {
                    name: req.body.name,
                    testimonial: req.body.testimonial,
                    image: req.file.path,
                    active: req.body.active,
                }
                // validate request
                await testimonialsValidation.createTestimonials(reqData)
                await Testimonials.updateOne({ _id: req.params.testimonialId }, reqData)
                try {
                    fs.unlinkSync(testimonial.image)
                } catch(err) {
                    console.error(err)
                }
            } else {
                // validate request
                await testimonialsValidation.updateTestimonials(req.body)
                await Testimonials.updateOne({ _id: req.params.testimonialId }, {
                    name: req.body.name,
                    testimonial: req.body.testimonial,
                    active: req.body.active,
                })
            }
            if (testimonials.name === req.body.name) {
                message = `Testimonial ${testimonials.name} updated successfully`
            } else {
                const updatedTesstimonials = await Testimonials.findById(req.params.testimonialId)
                message = `Testimonial ${testimonials.name} updated to ${updatedTesstimonials.name} successfully`
            }
        }

        res.json({
            status: "success",
            message: message,
            data: testimonials,
        }).status(201)
        console.log(`${message} by ${username}`)
        if (req.file) {
            const updatedTesstimonials = await Testimonials.findById(req.params.testimonialId)
            console.log(`${testimonials.image} removed and ${updatedTesstimonials.image} added successfully by ${username}`)
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

// deleteTestimonials
exports.deleteTestimonials = async (req, res) => {
    try {
        const username = await authController.getUsername(req.user._id)

        const deletedTestimonials = await Testimonials.findById(req.params.testimonialId)
        let message
        
        if (!deletedTestimonials) {
            message = `Testimonial not found`
        } else {
            await Testimonials.deleteOne({ _id: req.params.testimonialId })
            try {
                fs.unlinkSync(deletedTestimonials.image)
            } catch(err) {
                console.error(err)
            }
            message = `Testimonial ${deletedTestimonials.name} deleted successfully`
        }

        res.json({
            status:"success",
            message: message,
            data: deletedTestimonials
        }).status(201)
        console.log(`${message} by ${username}`)
        console.log(`Image of ${deletedTestimonials.name} (${deletedTestimonials.image}) removed successfully by ${username}`)
    } catch (error) {
        res.json({
            status:"error",
            message: error.message,
        }).status(400)
        console.log(`error: ${error}`)
    }
}