const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/user/register', async (req, res) => {
    const user = new User(req.body)
    const token = user.createWebToken()

    try {
        await user.save()
        res.status(201).send({ token })
    } catch (e) {
        res.status(400).send({ error: 'Can`t save user profile' })
    }
})

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.checkCredentials(req.body.email, req.body.password)
        const token = user.createWebToken()
        await user.save()
        res.send({ token })
    } catch (error) {
        res.status(500).send({ error })
    }
})

router.post('/user/logout', auth, async (req, res) => {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token !== req.token
    })

    try {
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(401).send({ error: 'Please, authenticate' })
    }
})

router.post('/user/logoutAll', auth, async (req, res) => {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token === req.token
    })

    try {
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(401).send({ error: 'Please, authenticate' })
    }
})

router.get('/user/shopping-list', async (req, res) => {
    
})

router.get('/user/orders', async (req, res) => {
    
})

module.exports = router
