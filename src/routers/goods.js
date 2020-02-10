const express = require('express')
const auth = require('../middleware/auth')
const Good = require('../models/good')
const authButtons = require('../middleware/authButtons')
const paginationCalc = require('../utils/paginationCalc')

const router = express.Router()

//sort query <sort=field_low||high_>
router.get('/', authButtons, async (req, res) => {
    try {
        let field, type
        if (req.query.sort) {
            field = req.query.sort.split('_')[0]
            type = req.query.sort.split('_')[1]
        } 
        type = (type === 'low') ? 1 : -1

        const amount = await Good.countDocuments({ manufacturer: req.query.manufacturer })
        const pages = paginationCalc(amount)

        const goods = await Good.find({ manufacturer: req.query.manufacturer }).sort([[field || 'price', type]]).skip(parseInt(req.query.skip) || 0).limit(12)
        return res.render('goods', { goods, 
                                     manufacturer: req.query.manufacturer, 
                                     sortType: req.query.sort || 'price_high', 
                                     ...req.authButtons, 
                                     pages, 
                                     current: req.query.skip || 0 })
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
    
})

router.get('/:id', authButtons, async (req, res) => {
    try {
        const good = await Good.findById(req.params.id)
        res.render('good', { good, ...req.authButtons })
    } catch (e) {
        console.log(e)
    }
})

router.post('/:id/sendComment', auth.isAuth, async (req, res) => {
    try {
        const good = await Good.findById(req.params.id)
        const date = new Date()

        good.comments.unshift([req.user.name, req.body.advantages, req.body.disadvantages, req.body.comment, `${date.getUTCDate()}.${date.getUTCMonth() + 1}.${date.getUTCFullYear()}`])
        good.isModified('comments')

        await good.save()
        res.redirect(`/goods/${req.params.id}`)
    } catch (e) {
        res.redirect(`/goods/${req.params.id}`)
    }
})

module.exports = router