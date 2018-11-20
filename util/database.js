const Sequelize = require('sequelize')

// const sequelize = new Sequelize(process.env.DATABASE_URL)

// const sequelize = new Sequelize('node-complete', 'root', 'root', {
//             dialect: 'mysql',
//             host: 'localhost'
// })

// let sequelize = null

if (!process.env.NODE_ENV) {
    sequelize = new Sequelize('node-complete', 'root', 'root', {
        dialect: 'mysql',
        host: 'localhost'
    })
} else {
    sequelize = new Sequelize(process.env.DATABASE_URL)
}

module.exports = sequelize