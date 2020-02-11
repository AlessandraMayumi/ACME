const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: Number
    },
    email:{
        type: String 
    },
    address: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Customer', customerSchema)