const mongoose = require('mongoose')

const goodSchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const Good = mongoose.model('good', goodSchema)
module.exports = Good