const fs = require('fs')
const path = require('path')

const file = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
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
}