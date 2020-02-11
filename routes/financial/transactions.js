const express = require('express')
const Transaction = require('../../model/financial/transaction')

const router = express.Router()


// All Job Transactions Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.title != null && req.query.title !== '') {
        searchOptions.title = new RegExp(req.query.title, 'i')
    }
    try {
        const transactions = await Transaction.find(searchOptions)
        res.render('financial/transactions/index', { 
            transactions: transactions,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// New Transaction Route
router.get('/new', async (req, res) => {
    res.render('financial/transactions/new', { transaction: new Transaction() })
})

// Create Transaction Route
router.post('/', async (req, res) => {
    const transaction = new Transaction({
        title: req.body.title,
        trans_type: req.body.trans_type,
        amount: req.body.amount,
        description: req.body.description
    })
    try {
        const newTransaction = await transaction.save()
        res.redirect(`/financial/transactions`)
    } catch {
        renderNewPage(res, transaction, true)
    }
})

module.exports = router