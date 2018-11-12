const Product = require('./../models/product')

module.exports.getAddProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    })
}

module.exports.postAddProducts = (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

module.exports.getProducts = (req, res, next) => {
    // console.log(adminData.products)
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    const products = Product.fetchAll((products) => {
        res.render('shop', {
            products: products,
            pageTitle: 'Shop',
            path: '/'
        })
    })
}