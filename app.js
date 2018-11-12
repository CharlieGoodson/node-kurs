const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const errorController = require('./controllers/error')

// const rootDir = require('./util/path')

const app = express()

app.set('view engine', 'ejs')
// app.set('view engine', 'pug')
app.set('views', 'views')


const adminRouts = require('./routes/admin')
const shopRoutes = require('./routes/shop')


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRouts)
app.use(shopRoutes)

app.use(errorController.get404)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))