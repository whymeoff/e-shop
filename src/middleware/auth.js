const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'PrivateKey')

    const user = await User.findOne( { _id: decoded._id, tokens: token })

    if (!user) return res.status(400).send({ error: 'Please, authenticate' })

    req.user = user
    req.token = token

    next()
}

module.exports = auth