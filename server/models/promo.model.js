const {model, Schema} = require('mongoose')

const promoSchema = new Schema({
    file: {
        type: String,
        default: null,
        required: true
    },
    created_at: {
        type: Date
    }
})

module.exports = model('promo', promoSchema)