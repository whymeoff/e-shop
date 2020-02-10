const express = require('express')
const calcSum = require('../utils/calcSum')
const paginationCalc = require('../utils/paginationCalc')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const authButtons = require('../middleware/authButtons')
const Cart = require('../models/cart')
const Order = require('../models/order')

const router = express.Router()

router.get('/orders', auth.isAuth, authButtons, async (req, res) => {
    try {
        let orders = await Order.find({ owner: req.user._id }).sort([['status', 1]]).skip(parseInt(req.query.skip) || 0).limit(12)
        const amount = await Order.countDocuments({ owner: req.user._id })
        const pages = paginationCalc(amount)

        orders.items = []

        for (let i = 0; i < orders.length; i++) {
            orders.items.push(await (await orders[i].populate('items.item').execPopulate()).toObject().items)
            calcSum(orders.items[i])
            orders[i].fullSum = orders.items[i].fullSum
        }

        res.render('orders', { orders, ...req.authButtons, pages, current: req.query.skip || 0 })
    } catch (e) {

    }
})

router.get('/order/:id', auth.isAuth, authButtons, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
        if (!cart || cart.owner !== req.user._id.toString()) return res.redirect('/')
        const items = await (await cart.populate('items.item').execPopulate()).toObject().items
        calcSum(items)
        res.render('order', { items, ...req.authButtons, cartID: cart._id })
    } catch (e) {
        return res.redirect('/')
    }
})

router.post('/order/:id', auth.isAuth, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
        if (!cart || cart.owner !== req.user._id.toString()) return res.redirect('/')

        const order = new Order({ ...req.body, owner: cart.owner, items: cart.items })
        await order.save()
        await cart.remove()
        res.redirect('/')
    } catch (e) {
        res.redirect(`/order/${cart._id}`)
    }
})

router.patch('/order/:id', isAdmin, async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, { status: parseInt(req.query.status) })
        res.send()
    } catch (e) {
        console.log(e)
        res.status(404).send()
    }
})

module.exports = router