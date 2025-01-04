import { Model, DataTypes } from "sequelize";
import {sequelize} from "../database.js";

class Experiencia extends Model { }
Experiencia.init(
    {
      experienciaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      clienteId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      institucion: {
        type: DataTypes.STRING,
      },
      cargo: {
        type: DataTypes.STRING,
      },
      actividades: {
        type: DataTypes.STRING,
      },
      fechaInicio: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      fechaFinal: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      estado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'experiencia',
      tableName: 'experiencia',
      timestamps: false
    }
  );
  
  export default Experiencia;