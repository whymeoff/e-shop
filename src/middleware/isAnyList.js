const GoodsList = require('../models/goodsList')

module.exports = async (req, res, next) => {
    let list = await GoodsList.findOne({ owner: req.user._id })
    if (!list) {
        list = new GoodsList({ owner: req.user._id })
        await list.save()
    }

    req.list = list

    next()
}