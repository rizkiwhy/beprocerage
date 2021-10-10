const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
    },
    period: {
        type: String,
        required: true
    },
    numberOfParticipants: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    instagram: {
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

module.exports = mongoose.model('Clients', clientSchema)