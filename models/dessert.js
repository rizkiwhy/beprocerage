const mongoose = require('mongoose')

const Dessert = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    calories: {
        type: Number,
        require: true
    },
    fat: {
        type: Number,
        require: true
    },
    carbs: {
        type: Number,
        require: true
    },
    protein: {
        type: Number,
        require: true
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Dessert', Dessert)