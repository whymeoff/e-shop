const express = require('express')
const calcSum = require('../utils/calcSum')
const auth = require('../middleware/auth')
const authButtons = require('../middleware/authButtons')
const Cart = require('../models/cart')
const Order = require('../models/order')

const router = express.Router()

router.get('/:id', auth.auth, authButtons, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
        if (!cart) return res.redirect('/')
        const items = await (await cart.populate('items.item').execPopulate()).toObject().items
        calcSum(items)
        res.render('order', { items, ...req.authButtons })
    } catch (e) {

    }
})

module.exports = router