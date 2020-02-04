const express = require('express')
const auth = require('../middleware/auth')
const findInCart = require('../utils/findInCart')
const Cart = require('../models/cart')
const authButtons = require('../middleware/authButtons')

const router = express.Router()

//GET => /cart
router.get('/', auth.auth, authButtons, async (req, res) => {
    try {
        let cart = await Cart.findOne({ owner: req.user._id })
        const items = await (await cart.populate('items.item').execPopulate()).toObject().items
        let fullSum = 0
        for (let i = 0; i < items.length; i++) {
            items[i].item.sum = items[i].amount * items[i].item.price
            fullSum += items[i].item.sum
        }
        res.render('cart', { items, fullSum, ...req.authButtons })
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})  

//POST => /cart?goodID=goodID
router.post('/', auth.auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ owner: req.user._id })
        if (!cart) {
            cart = new Cart({ owner: req.user._id })
        }

        let k = findInCart(cart.toObject(), req.query.goodID)
        if (k > -1) {
            cart.items[k].amount += 1
            cart.isModified('items')
            await cart.save()
            return res.redirect(`/goods/${req.query.goodID}`)
        }
        cart.items = cart.items.concat({ item: req.query.goodID, amount: 1 })
        await cart.save()
        res.redirect(`/goods/${req.query.goodID}`)
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})

router.patch('/', auth.auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ owner: req.user._id })
        let k = findInCart(cart.toObject(), req.query.goodID)
        
        if (cart.items[k].amount === 1 && req.query.type === 'minus') return res.send()

        if (req.query.type === 'plus') {
            cart.items[k].amount += 1
        } else {
            cart.items[k].amount -= 1
        }

        cart.isModified('items')
        await cart.save()
        res.send()
    } catch (e) {
        res.redirect('/')
    }
})

router.delete('/', auth.auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ owner: req.user._id })
        let k = findInCart(cart.toObject(), req.query.goodID)

        let tmp = cart.items[0]
        cart.items[0] = cart.items[k]
        cart.items[k] = tmp
        cart.items.shift()
    
        cart.isModified('items')
        await cart.save()
        res.send()
    } catch (e) {
        res.redirect('/')
    }  
})

module.exports = router