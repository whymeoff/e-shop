const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    goods: {
        type: [mongoose.Types.ObjectId],
        default: []
    }
})

const List = mongoose.model('goodsList', listSchema)
module.exports = List