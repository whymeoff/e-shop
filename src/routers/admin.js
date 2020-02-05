const express = require('express')
const upload = require('../config/multerConfig')
const fs = require('fs')
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

router.post('/create', isAdmin, authButtons, upload.single('img'), async (req, res) => {
    const date = Date.now()
    fs.writeFile(`./public/img/${date}.png`, req.file.buffer, async () => {
        const good = new Good({ ...req.body, img: `/img/${date}.png` })
        try {
            const count = await Good.countDocuments()
            good.code = count
            await good.save()
            return res.render('admin', { create: true, ...req.authButtons })
        } catch (e) {
            console.log(e)
            return res.render('admin', { create: true, ...req.authButtons })
        }
    })
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