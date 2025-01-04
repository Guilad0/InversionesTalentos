import { Model, DataTypes } from "sequelize";
import {sequelize} from "../database.js";

class Ajuste extends Model { }
Ajuste.init(
    {
      ajusteId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      comisionFijaGanancia: {
        type: DataTypes.DOUBLE,
      },
      comisionPorcentualGanancia: {
        type: DataTypes.DOUBLE,
      },
      comisionFijaRetiro: {
        type: DataTypes.DOUBLE,
      },
      comisionPorcentualRetiro: {
        type: DataTypes.DOUBLE,
      },
      tiempoMinimoInversion: {
        type: DataTypes.INTEGER,
      },
      tiempoMaximoInversion: {
        type: DataTypes.INTEGER,
      },
      sancionPorcentualRetraso: {
        type: DataTypes.DOUBLE,
      },
      estado: {
        type: DataTypes.TINYINT,
      },
      valorToken: {
        type: DataTypes.DOUBLE,
      },
      adminId: {
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
      propositoImagen: {
        type: DataTypes.STRING,
        field: 'propositoImagen',
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
  
  export default Ajuste;