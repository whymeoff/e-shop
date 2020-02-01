const LocalStrategy = require('passport-local')
const User = require('./models/user')
const bcrypt = require('bcryptjs')

const initialize = (passport) => {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await User.findOne({ email })
            // Check email
            if (!user) return done(null, false, { message: 'Invalid credentials' })
            // Check password
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Invalid credentials' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => { done(null, user) })
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id) 
        return done(null, user) 
    })
}

module.exports = initialize