module.exports = (req, res, next) => {
    if (req.user.email === 'marcus.kozachenko.123.321@gmail.com') return next()
    return res.redirect('/')
}