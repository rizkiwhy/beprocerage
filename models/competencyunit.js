const mongoose = require('mongoose')

const competencyunitSchema = new mongoose.Schema ({
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
    codeSchema: {
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

module.exports = mongoose.model('Competencyunits', competencyunitSchema)