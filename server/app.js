const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

const passportStrategy = require('./middleware/passport-strategy')
const authRoutes = require('./routes/auth.routes')
const newsRoutes = require('./routes/news.routes')
const orderRoutes = require('./routes/order.routes')
const currencyRoutes = require('./routes/currency.routes')

const keys = require('./keys')
const app = express()

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true, autoIndex: false })
    .then(() => console.log('MongboDB connected...'))
    .catch(error => console.log(error))

app.use(passport.initialize())
passport.use('JWT', passportStrategy)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/currency', currencyRoutes)

module.exports = app