const fs = require('fs')
const path = require('path')

const file = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
    static getCart(cb) {
        fs.readFile(file, (err, fileContent) => {
            if (!err) {
                cb(JSON.parse(fileContent))
            } else {
                cb(null)
            }
        }) 
    }

    static addProduct(id, price) {
        // получить имеющуюся корзину или создать новую
        fs.readFile(file, (err, fileContent) => {
            // создаем новую
            let cart = { products: [], totalSum: 0 }
            // если есть то считываем с файла имеющуюся
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            // проверяем есть ли в козрине уже такой продукт
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            // если есть то...
            let updatedProduct
            if (existingProduct) {
                updatedProduct = {...existingProduct}
                updatedProduct.qty = existingProduct.qty + 1
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = {id: id, qty: 1}
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalSum += +price
            fs.writeFile(file, JSON.stringify(cart), err => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(file, (err, fileContent) => {
            if (err) return
            const updatedCart = { ...JSON.parse(fileContent)}
            const product = updatedCart.products.find(p => p.id === id)
            const productQty = product.qty
            updatedCart.totalSum -= productQty * productPrice
            updatedCart.products = updatedCart.products.filter(p => p.id !== id)
            fs.writeFile(file, JSON.stringify(updatedCart), err => {
                console.log(err)
            })
        })
    }
}