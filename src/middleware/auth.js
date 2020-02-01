const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return res.redirect('/user/login')
    }
}

const notAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    } else {
        return next()
    }
}
module.exports = { auth, notAuth }