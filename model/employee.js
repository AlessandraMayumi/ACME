const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    dept_name: {
        type: String
    },
    hire_date: {
        type: Date,
        require: true
    },
    to_date: {
        type: Date
    }
})

module.exports = mongoose.model('Employee', employeeSchema)