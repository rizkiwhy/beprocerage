const mongoose = require('mongoose')

const inboxschema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        min: 6,
    },
    email: {
        type: String,
        required: true,
        min: 6,
    },
    notelp: {
        type: Number,
        required: true,
        min: 6,
    },
    subject: {
        type: String,
        required: true,
        min: 6,
    },
    message: {
        type: String,
        required: true,
        min: 6,
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('Inbox', inboxschema)