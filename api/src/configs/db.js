const Sequelize = require('sequelize');
const {
    DB_PASSWORD,
    DB_USER,
    DB_NAME,
    DB_HOST} = require('./index');



const sequelize = new Sequelize(
    DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'mysql'
      }
);

module.exports = sequelize;