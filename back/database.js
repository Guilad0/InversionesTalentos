var mysql = require('mysql2');
var dotenv = require('dotenv');
var { Sequelize } = require('sequelize')
dotenv.config();

var conf = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  connectTimeout: 10000,
  //acquireTimeout: 10000,
  ssl: false,
};

var sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    define: {
        underscored: false
    },
    logging: console.log,
    dialectOptions: {
      connectTimeout: 10000, 
      ssl: false,
    },
  }
);


var connection = mysql.createPool(conf);

module.exports = {
  connection,
  sequelize
};
