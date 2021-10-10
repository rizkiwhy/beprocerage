const mongoose = require('mongoose')

const certificationSchema = new mongoose.Schema ({
    code: {
        type: String,
        required: true,
        min: 24,
        unique: true
    },
    name: {
        type: String,
        required: true,
        min: 6,
        unique: true
    },
    tags: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        min: 6,
    },
    mea: {
        type: String,
        required: true
    },
    field: {
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

module.exports = mongoose.model('Certifications', certificationSchema)