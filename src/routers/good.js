const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Good = require('../models/good')

router.post('/newGood', auth, async (req,res) => {
    try {
        const count = await Good.countDocuments()
        const good = new Good({ ...req.body, code: count })
        await good.save()
        res.status(201).send()
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/removeGood', auth, async (req, res) => {
    try {
        await Good.findByIdAndDelete(req.body._id)
        res.send()
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router