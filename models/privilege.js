const mongoose = require('mongoose')

const privilegeSchema = new mongoose.Schema ({
    title: {
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
    icon: {
        type: String,
        required: true,
        min: 6
    },
    active: {
        type: Boolean,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Privileges', privilegeSchema)