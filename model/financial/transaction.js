const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    trans_type: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)