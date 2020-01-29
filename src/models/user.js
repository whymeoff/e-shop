const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) throw new Error('Invalid age')
        },
        default: 0
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Invalid email')
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 8
    },
    tokens: {
        type: [String],
        default: []
    }
})

userSchema.methods.createWebToken = function() {
    const user = this

    const token = jwt.sign({ _id: user._id }, 'PrivateKey')
    user.tokens.push(token)

    return token
}

userSchema.statics.checkCredentials = async function(email, password) {
    const user = await User.findOne({ email })

    if (!user) throw new Error('Invalid user')

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new Error('Invalid user')

    return user
}

userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) user.password = await bcrypt.hash(user.password, 8)
    next()
})

const User = mongoose.model('user', userSchema)
module.exports = User