const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const isAnyList = require('../middleware/isAnyList')
const GoodsList = require('../models/goodsList')

router.get('/goodsList', auth, isAnyList, async (req, res) => {
    res.send()
})

module.exports = router