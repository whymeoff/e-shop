const mongoose = require('mongoose')
const GoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    model: {
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
    },
    img: {
        type: String,
        default: '/img/default.png'
    },
    comments: {
        type: Array,
        default: []
    }
})

const Good = mongoose.model('good', GoodSchema)
module.exports = Good