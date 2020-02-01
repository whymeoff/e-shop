const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    const options = {}
    // Check auth for buttons login or logout
    if (req.isAuthenticated()) {
        options.logout = true
    } else {
        options.login = true
    }

    return res.render('main', { ...options })
})

module.exports = router