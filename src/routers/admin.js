const express = require('express')
const isAdmin = require('../middleware/isAdmin')
const Good = require('../models/good')

const router = express.Router()

router.get('/', isAdmin, (req, res) => {
    res.render('admin', {
        name: req.user.name
    })
})

module.exports = router