const mongoose = require('mongoose')
const GoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: Number
    }
})

const Good = mongoose.model('good', GoodSchema)
module.exports = Good