const express = require('express')
const authButtons = require('../middleware/authButtons')

const router = express.Router()

router.get('/', authButtons, (req, res) => {
    const options = {}

    return res.render('main', { ...req.authButtons })
})

module.exports = router