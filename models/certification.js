const mongoose = require('mongoose')

const certificationSchema = new mongoose.Schema ({
    name: {
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
    numberOfMeetings: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    level: {
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