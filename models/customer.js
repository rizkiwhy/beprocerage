const mongoose = require('mongoose')

const Customer = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Customer', Customer)