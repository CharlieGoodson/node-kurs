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
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(result => {
      res.redirect('/admin/add-product')
    })
    .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
  const editing = req.query.editing
  const productId = req.params.productId
  if (!editing) res.redirect('/')
  Product.findById(productId, product => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/add-product',
      editing,
      product
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price, productId);
  product.save();
  res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId
  Product.deleteById(productId)
  res.redirect('/admin/products')
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
