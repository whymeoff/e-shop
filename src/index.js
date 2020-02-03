require('./db/mongoose')
require('dotenv').config()
require('./config/hbsConfig')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const FileStore = require('connect-loki')(session);

// Passport initialization
const initializePassport = require('./passport-config')
initializePassport(passport)

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Url encoded setup
app.use(express.urlencoded({ extended: false }))

// Passport settings
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
        maxAge: 1000*60*60*24
    }
}))
app.use(passport.initialize())
app.use(passport.session())

// Setup static dir to serve
app.use(express.static(path.join(__dirname, '../public')))

// Setup routers
app.use(express.json())
app.use(require('./routers/main'))
app.use('/user', require('./routers/user'))
app.use('/admin', require('./routers/admin'))
app.use('/goods', require('./routers/goods'))

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})