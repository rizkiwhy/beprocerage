const { boolean } = require('joi')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        unique: true
    },
    subtitle: {
        type: String,
        required: true,
        min: 6,
        unique: true
    },
    description: {
        type: String,
        required: true,
        min: 6,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    publisher: {
        type: String,
        required: true,
        min: 6
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Blogs', blogSchema)