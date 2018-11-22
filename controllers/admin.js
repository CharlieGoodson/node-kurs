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
  let description = req.body.description;
  description = description.replace(/\r\n/g, '<br>')
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(result => {
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
  const editing = req.query.editing
  const productId = req.params.productId
  if (!editing) res.redirect('/')
  Product.findById(productId)
    .then(product => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/add-product',
        editing,
        product
      })
    })
    .catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.findById(productId)
    .then(product => {
      product.title = title
      product.imageUrl = imageUrl
      product.price = price
      product.description = description
      return product.save()
    })
    .then(result => {
      console.log('UPDATED')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId
  Product.findById(productId)
    .then(product => {
      return product.destroy()
    })
    .then(result => {
      console.log('DESTROYED')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  })
  .catch(err => console.log(err))
}
