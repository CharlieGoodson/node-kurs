const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

// const rootDir = require('./util/path')

const app = express()

app.set('view engine', 'ejs')
// app.set('view engine', 'pug')
app.set('views', 'views')


const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
    res.status(404).render('404', {
        pageTitle: 'Error 404 - Page not found',
        path: ''
    })
})

const port = process.env.port || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))