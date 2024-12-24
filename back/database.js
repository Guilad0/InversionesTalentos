// var mysql = require('mysql');
var mysql = require('mysql2');
//const { Sequelize } = require('sequelize');
var dotenv = require('dotenv');
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

var conexion = mysql.createPool(conf);

// const sequelize = new Sequelize(
//   process.env.DB_DATABASE,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: 3306,
//     dialect: process.env.DB_DIALECT,
//     define: {
//         underscored: true
//     },
//     logging: console.log,
//   }
// )

// async function connectDB (){
//   try {
//     await sequelize.authenticate();
//     console.log('conectado con sequalize exito!.');
//   } catch (error) {
//     console.error('error al conectar con Sequelize:', error);
//   }
// };

module.exports = {
  conexion, // para manual
  //sequelize, // consultas automaticas con sequal
};
