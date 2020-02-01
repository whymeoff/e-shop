const express = require('express')
const validator = require('validator')
const passport = require('passport')
const auth = require('../middleware/auth')
const User = require('../models/user')

const router = express.Router()

router.get('/register', auth.notAuth, async (req, res) => {
    res.render('register')
})

router.get('/login', auth.notAuth, async (req, res) => {
    res.render('login')
})

router.post('/register', async (req, res) => {
    const { email, password, age } = req.body
    const errors = []
    //Validation
    if (!validator.isEmail(email)) errors.push('You must provide correct email')
    if (password.length < 7) errors.push('You must provide password with more than 7 characters')
    if (parseInt(age) < 0 || Number.isNaN(parseInt(age))) errors.push('You must provide valid age')
    if (errors.length > 0) return res.render('register', { errors, ...req.body })

    // Saving model
    try {
        const user = new User({ ...req.body })
        await user.save()
        res.redirect('/user/login')
    } catch (e) {
        return res.render('register')
    }
    
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
}))

router.post('/logout', auth.auth, async (req, res) => {
    req.logOut()
    return res.redirect('/user/login')
})

module.exports = router
