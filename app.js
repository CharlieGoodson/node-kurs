const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')

const Product = require('./models/product')
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById(1)
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const port = process.env.PORT || 3000

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)

sequelize
    // .sync({ force: true }) пересоздает заново все таблицы при запуске
    .sync()
    .then(result => {
        return User.findById(1)
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Max', email: 'test@test.com' })
        }
        return user
    })
    .then(user => {
        console.log(user.id, user.name, user.email)
        app.listen(port, () => console.log(`Server started on port ${port}`))
    })
    .catch(err => {
        console.log(err)
    })

