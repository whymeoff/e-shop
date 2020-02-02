module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.authButtons = { logout: true }
    } else {
        req.authButtons = { login: true }
    }
    next()
}