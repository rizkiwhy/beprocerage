const mongoose = require('mongoose')

const meaSchema = new mongoose.Schema ({
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

module.exports = mongoose.model('Meas', meaSchema)