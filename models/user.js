const { ObjectId } = require('mongodb')
const { getDb } = require('./../util/database')

class User {
  constructor(name, email, cart, id) {
    this._id = id 
    this.name = name
    this.email = email
    this.cart = this.cart
  }

  save() {
    const db = getDb()
    return db.collection('users').insertOne(this)
  }

  addToCart(product) {
    const updatedCart = { items: [{productId: new ObjectId(product._id), quantity: 1}] }
    const db = getDb()
    return db
      .collection('users')
      .updateOne(
        {_id: new ObjectId(this._id)},
        { $set: { cart: updatedCart } }
      )
  }
  
  static findById(userId) {
    const db = getDb()
    return db.collection('users').findOne({_id: new ObjectId(userId)})
  }
}

module.exports = User