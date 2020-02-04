const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
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

const Cart = mongoose.model('cart', CartSchema)
module.exports = Cart