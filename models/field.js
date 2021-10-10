const mongoose = require('mongoose')

const fieldSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        min: 6,
        unique: true
    },
    active: {
        type: Boolean,
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Fields', fieldSchema)