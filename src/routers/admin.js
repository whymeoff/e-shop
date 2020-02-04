const express = require('express')
const isAdmin = require('../middleware/isAdmin')
const authButtons = require('../middleware/authButtons')
const Good = require('../models/good')

const router = express.Router()

router.get('/', isAdmin, authButtons, (req, res) => {
    res.render('admin', {
        greet: req.user.name,
        ...req.authButtons
    })
})

router.get('/create', isAdmin, authButtons, (req, res) => {
    res.render('admin', {
        create: true
    })
})

router.get('/edit', isAdmin, authButtons, (req, res) => {
    res.render('admin', {
        search: true
    })
})

router.get('/orders', isAdmin, authButtons, (req, res) => {
    res.render('admin', {
        orders: true
    })
})

router.post('/create', isAdmin, authButtons, async (req, res) => {
    const good = new Good({ ...req.body })

    try {
        const count = await Good.countDocuments()
        good.code = count
        await good.save()
        return res.render('admin', { create: true, ...req.authButtons })
    } catch (e) {
        return res.render('admin', { create: true, ...req.authButtons })
    }
})

router.post('/edit', isAdmin, authButtons, async (req, res) => {
    try {
        if (req.body.value) {
            let good = await Good.findOne({ code: req.body.value })
            if (!good) return res.render('admin', { search: true })
            good = good.toObject()
            return res.render('admin', { edit: true, ...good })
        } else {
            const good = await Good.findByIdAndUpdate(req.body.id, { ...req.body })
            res.render('admin', { search: true, ...req.authButtons })
        }
    } catch (e) {
        return res.render('admin', { search: true, ...req.authButtons })
    }
})

module.exports = router