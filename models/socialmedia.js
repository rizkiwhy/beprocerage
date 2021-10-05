const mongoose = require('mongoose')

const socialmediaSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        min: 3,
        unique: true
    },
    value: {
        type: String,
        required: true,
        min: 6,
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

module.exports = mongoose.model('SocialMedias', socialmediaSchema)