const mongoose = require('mongoose')

const expertiseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    icon: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Expertises', expertiseSchema)