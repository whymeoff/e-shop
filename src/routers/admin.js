const express = require('express')
const Good = require('../models/good')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('admin', {
        name: req.user.name
    })
})

module.exports = router