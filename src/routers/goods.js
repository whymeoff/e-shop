const express = require('express')
const Good = require('../models/good')

const router = express.Router()

//sort query <sort=field_low||high_>
router.get('/', async (req, res) => {
    try {
        let field, type
        if (req.query.sort) {
            field = req.query.sort.split('_')[0]
            type = req.query.sort.split('_')[1]
        } 
        type = (type === 'low') ? 1 : -1

        const goods = await Good.find({ manufacturer: req.query.manufacturer }).sort([['price', type]])
        return res.render('goods', { goods, manufacturer: req.query.manufacturer, sortType: req.query.sort || 'price_high' })
    } catch (e) {
        res.redirect('/')
    }
    
})

router.get('/:id', async (req, res) => {
    try {
        const good = await Good.findById(req.params.id)
    } catch (e) {

    }
})

module.exports = router