const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

let _db

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://shopadmin:123zxc@cluster0-0zllz.mongodb.net/shop?retryWrites=true', { useNewUrlParser: true })
    .then(client => { 
        console.log('connected...')
        _db = client.db()
        callback()
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw 'No database found!'
}

module.exports.mongoConnect = mongoConnect
module.exports.getDb = getDb


// const Sequelize = require('sequelize')

// // const sequelize = new Sequelize(process.env.DATABASE_URL)

// // const sequelize = new Sequelize('node-complete', 'root', 'root', {
// //             dialect: 'mysql',
// //             host: 'localhost'
// // })

// // let sequelize = null

// if (!process.env.NODE_ENV) {
//     sequelize = new Sequelize('node-complete', 'root', 'root', {
//         dialect: 'mysql',
//         host: 'localhost'
//     })
// } else {
//     sequelize = new Sequelize(process.env.DATABASE_URL)
// }

// module.exports = sequelize