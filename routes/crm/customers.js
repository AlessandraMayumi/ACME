const express = require('express')
const Customer = require('../../model/crm/customer')

const router = express.Router()

// All Customer Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const customers = await Customer.find(searchOptions)
        res.render('crm/customers/index', { 
            customers: customers,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New Customer Route
router.get('/new', (req, res) => {
    res.render('crm/customers/new', { customer: new Customer() })
})

// Create Customer Route 
router.post('/', async (req, res) =>{
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    })
    try{
        const newCustomer = await customer.save()
        res.redirect(`/crm/customers`)
    } catch {
        res.render('crm/customers/new', {
            customer: customer,
            errorMessage: 'Error creating Customer'
        })
    }
})

module.exports = router