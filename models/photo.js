const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    width: {
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

module.exports = mongoose.model('Photos', photoSchema)