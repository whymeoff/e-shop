const express = require('express')
const calcSum = require('../utils/calcSum')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
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
        res.render('order', { items, ...req.authButtons, cartID: cart._id })
    } catch (e) {
        return res.redirect('/')
    }
})

router.post('/:id', auth.auth, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
        if (!cart) return res.redirect('/')

        const order = new Order({ ...req.body, owner: cart.owner, items: cart.items })
        await order.save()
        await cart.remove()
        res.redirect('/')
    } catch (e) {
        res.redirect(`/order/${cart._id}`)
    }
})

router.patch('/:id', isAdmin, async (req, res) => {
    console.log(req.query)
    try {
        await Order.findByIdAndUpdate(req.params.id, { status: parseInt(req.query.status) })
        res.send()
    } catch (e) {
        console.log(e)
        res.status(404).send()
    }
})

module.exports = router