const mongoose = require('mongoose')

const expertiseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        unique: true
    },
    icon: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true,
        unique: true
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

module.exports = mongoose.model('Expertises', expertiseSchema)