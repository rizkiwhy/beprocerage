const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        min: 5,
        unique: true
    },
    value: {
        type: String,
        required: true,
        min: 6
    },
    icon: {
        type: String,
        required: true,
        min: 6
    },
    link: {
        type: String,
        unique: true
    },
    active: {
        type: Boolean,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Contacts', contactSchema)