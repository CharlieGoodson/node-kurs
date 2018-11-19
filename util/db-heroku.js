const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'dd2n3cavqvo14c',
    'mcklynqwjewvfo',
    '160ac19aa820bd83033571886e359ac523b41a6c927c96032597cfad2b2c9221',
    {
        dialect: 'postgres',
        host: 'ec2-54-75-231-3.eu-west-1.compute.amazonaws.com:5432'
    }
)

module.exports = sequelize