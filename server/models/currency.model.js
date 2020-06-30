const {model, Schema} = require('mongoose')

const promoSchema = new Schema({
    USD: {
        type: Number,
        default: 1,
        required: true
    },
    EUR: {
        type: Number,
        default: 1,
        required: true
    },
    BYN: {
        type: Number,
        default: 1,
        required: true
    },
    RUB: {
        type: Number,
        default: 1,
        required: true
    }
})

module.exports = model('currency', promoSchema)