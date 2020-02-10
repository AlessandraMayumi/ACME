const express = require('express')
const Employee = require('../model/employee')

const router = express.Router()

// All Employee Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const employee = await Employee.find(searchOptions)
        res.render('employee/index', { 
            employee: employee,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New Employee Route
router.get('/new', (req, res) =>{
    res.render('employee/new', { employee: new Employee() })
})

// Create Employee Route 
router.post('/', async (req, res) =>{
    const employee = new Employee({
        name: req.body.name
    })
    try{
        const newEmployee = await employee.save()
        res.redirect(`employee`)
    } catch {
        res.render('employee/new', {
            employee: employee,
            errorMessage: 'Error creating Employee'
        })
    }
})

module.exports = router