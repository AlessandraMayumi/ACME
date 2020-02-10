const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')

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
app.use('/authors', authorsRouter)

// Listen PORT
app.listen(process.env.PORT || 3000)