const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema({
    chart: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Chart'
    },
    name: {
        type: String,
        required: true
    },
    card_number: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Checkout', checkoutSchema)