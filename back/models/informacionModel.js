import { Model, DataTypes } from "sequelize";
import {sequelize} from "../database.js";

class Informacion extends Model { }
Informacion.init(
    {
      infoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      clienteId: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      ocupacion: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      montoInversion: {
        type: DataTypes.INTEGER,
      },
      cantidadMaximaInversiones: {
        type: DataTypes.INTEGER,
      },
      preparacion: {
        type: DataTypes.STRING,
      },
      estudios: {
        type: DataTypes.STRING,
      },
      vision: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.TINYINT,
        allowNull: false, 
        defaultValue: 0,
      },
      video: {
        type: DataTypes.STRING,
      },
      imagen: {
        type: DataTypes.STRING,
      },
      inversionControl: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'informacion',
      tableName: 'informacion',
      timestamps: false
    }
  );
  
  export default Informacion;