const mongoose = require('mongoose')

const assesorSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        min: 6
    },
    tags: {
        type: [String],
        required: true
    },
    degree: {
        type: String,
        required: true,
        min: 6
    },
    graduateOf: {
        type: String,
        required: true,
        min: 6
    },
    quote: {
        type: String,
        required: true,
        min: 6
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

module.exports = mongoose.model('assesors', assesorSchema)