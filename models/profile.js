const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema ({
    number: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
        min: 6,
        unique: true
    },
    category: {
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

module.exports = mongoose.model('Profiles', profileSchema)