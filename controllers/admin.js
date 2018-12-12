const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product({ title, price, description, imageUrl })
  product.save()
    .then(result => {
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
  const editing = req.query.editing
  if (!editing) res.redirect('/')
  const productId = req.params.productId
  Product.findById(productId)
    .then(product => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/add-product',
        product,
        editing
      })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findById(productId).then(product => {
    product.title = title
    product.imageUrl = imageUrl
    product.price = price
    product.description = description
    return product.save()
  })
    .then(result => {
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId
  Product.findByIdAndRemove(productId)
    .then(result => {
      console.log('Deleted')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
  // req.user.getProducts()
  Product.find()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  })
  .catch(err => console.log(err))
}
