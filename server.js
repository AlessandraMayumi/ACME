const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const customerRouter = require('./routes/crm/customers')
const transactionRouter = require('./routes/financial/transactions')
const employeeRouter = require('./routes/hr/employees')
const titleRouter = require('./routes/hr/titles')
const chartRouter = require('./routes/online_store/charts')
const checkoutRouter = require('./routes/online_store/checkout')

const app = express()

// setup
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
// body-parser setup
app.use(bodyParser.urlencoded({ limit:'10mb', extended: false }));
app.use(bodyParser.json());

// mongoose connection
const mongoose = require('mongoose')
const uristring = process.env.MONGODB_URI || 'mongodb://localhost/ACMEdb'
mongoose.connect(uristring, {   
    useNewUrlParser: true,
    useUnifiedTopology: true},
    function (err, res) {
        if (err) {console.log ('ERROR connecting to: ' + uristring + '. ' + err) } 
        else { console.log ('Succeeded connected to: ' + uristring) }
    }
)

// routes
app.use('/', indexRouter)
app.use('/crm/customers', customerRouter)
app.use('/financial/transactions', transactionRouter)
app.use('/hr/employees', employeeRouter)
app.use('/hr/titles', titleRouter)
app.use('/online_store/charts', chartRouter)
app.use('/online_store/checkout', checkoutRouter)

// Listen PORT
app.listen(process.env.PORT || 3000)