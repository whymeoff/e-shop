const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    addressee: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        default: 0
    },
    items: [{
        item: {
            type: mongoose.Types.ObjectId,
            ref: 'good',
            required: true
        },
        amount: {
            type: Number,
            default: 1
        }
    }]
})

const Order = mongoose.model('order', OrderSchema)
module.exports = Order