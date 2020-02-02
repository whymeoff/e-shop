const express = require('express')
const isAdmin = require('../middleware/isAdmin')
const authButtons = require('../middleware/authButtons')
const Good = require('../models/good')

const router = express.Router()

router.get('/', isAdmin, authButtons, (req, res) => {
    res.render('admin', {
        name: req.user.name,
        ...req.authButtons
    })
})

module.exports = router