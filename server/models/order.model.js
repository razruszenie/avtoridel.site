const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const orderSchema = new Schema({
    status: {
        type: Number,
        required: true,
        default: 0
    },
    part: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    more: {
        type: String,
    },
    created_at: {
        type: Date
    },
    viewed_at: {
        type: Date,
        default: null
    }
})

orderSchema.plugin(mongoosePaginate)
module.exports = model('orders', orderSchema)