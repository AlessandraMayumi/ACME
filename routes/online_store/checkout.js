const express = require('express')
const Checkout = require('../../model/online_store/checkout')
const Chart = require('../../model/online_store/chart')

const router = express.Router()


// All Job Checkouts Route
router.get('/', async (req, res) => {
    try {
      const checkouts = await Checkout.find({})
      res.render('online_store/checkout/index', {
        checkouts: checkouts
      })
    } catch {
      res.redirect('/')
    }
  })
  
// New Checkout Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Checkout())
})

// Create Checkout Route
router.post('/', async (req, res) => {
  const checkout = new Checkout({
    checkout: req.body.checkout,
    chart: req.body.chart,
    from_date: new Date(req.body.from_date),
    to_date: new Date(req.body.to_date)
  })
  try {
    const newCheckout = await checkout.save()
    res.redirect(`online_store/checkout`)
  } catch {
    renderNewPage(res, checkout, true)
  }
})


async function renderNewPage(res, checkout, hasError = false) {
  try {
    const charts = await Chart.find({})
    const params = {
      charts: charts,
      checkout: checkout
    }
    if (hasError) params.errorMessage = 'Error Creating Checkout'
    res.render('online_store/checkout/new', params)
  } catch {
    res.redirect('/online_store/checkout')
  }
}

module.exports = router