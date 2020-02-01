const mongoose = require('mongoose')
const validator = require('validator')
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

userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) user.password = await bcrypt.hash(user.password, 8)
    next()
})

const User = mongoose.model('user', userSchema)
module.exports = User