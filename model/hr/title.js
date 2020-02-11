const mongoose = require('mongoose')

const titleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    from_date: {
        type: Date,
        //required: true
    },
    to_date: {
        type: Date
    }
})

module.exports = mongoose.model('Title', titleSchema)