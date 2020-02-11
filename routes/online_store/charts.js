const express = require('express')
const Chart = require('../../model/online_store/chart')
const Customer = require('../../model/crm/customer')

const router = express.Router()

// All Chart Route
router.get('/', async (req, res) => {
    try {
        const charts = await Chart.find({})
        res.render('online_store/charts/index', { 
            charts: charts,
        })
    } catch {
        res.redirect('/')
    }
})

// New Chart Route
router.get('/new', (req, res) => {
    renderNewPage(res, new Chart())
})

// Create Chart Route 
router.post('/', async (req, res) =>{
    const chart = new Chart({
        customer: req.body.customer,
        total: req.body.total
    })
    try{
        const newChart = await chart.save()
        res.redirect(`/online_store/charts`)
    } catch {
        renderNewPage(res, customer, true)
    }
})

async function renderNewPage(res, chart, hasError = false) {
    try {
      const customers = await Customer.find({})
      const params = {
        chart: chart,
        customers: customers
      }
      if (hasError) params.errorMessage = 'Error Creating Chart'
        res.render('online_store/charts/new', params)
    } catch {
      res.redirect('/online_store/charts')
    }
  }

module.exports = router