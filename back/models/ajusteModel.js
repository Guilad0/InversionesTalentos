const { Model, DataTypes } = require("sequelize");
const {sequelize} = require("../database.js");

class Ajuste extends Model { }
Ajuste.init(
    {
        ajuste_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      comision_fija_ganancia: {
        type: DataTypes.DOUBLE,
      },
      comision_porcentual_ganancia: {
        type: DataTypes.DOUBLE,
      },
      comision_fija_retiro: {
        type: DataTypes.DOUBLE,
      },
      comision_porcentual_retiro: {
        type: DataTypes.DOUBLE,
      },
      tiempo_minimo_inversion: {
        type: DataTypes.INTEGER,
      },
      tiempo_maximo_inversion: {
        type: DataTypes.INTEGER,
      },
      sancion_porcentual_retraso: {
        type: DataTypes.DOUBLE,
      },
      estado: {
        type: DataTypes.TINYINT,
      },
      valor_token: {
        type: DataTypes.DOUBLE,
      },
      admin_id: {
        type: DataTypes.INTEGER,
      },
      image1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image2: {
        type: DataTypes.STRING,
      },
      image3: {
        type: DataTypes.STRING,
      },
      textHome: {
        type: DataTypes.STRING,
        field: 'textHome',
      },
      partners: {
        type: DataTypes.STRING,
      },
      propositoText: {
        type: DataTypes.STRING,
        field: 'propositoText',
      },
      proposito_imagen: {
        type: DataTypes.STRING,
        field: 'proposito_imagen',
      },
      video: {
        type: DataTypes.STRING,
      },
      logo: {
        type: DataTypes.STRING,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      tipo_moneda: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'ajuste',
      tableName: 'ajustes',
      timestamps: false
    }
  );

  module.exports = Ajuste;