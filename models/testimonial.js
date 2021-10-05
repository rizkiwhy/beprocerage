const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    testimonial: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Testimonials', testimonialSchema)