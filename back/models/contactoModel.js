import { Model, DataTypes } from "sequelize";
import {sequelize} from "../database.js";

class Contacto extends Model { }
Contacto.init(
    {
      contactoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING,
      },
      apellido: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      comentarios: {
        type: DataTypes.STRING,
      },
      respuesta: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.TINYINT,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'contacto',
      tableName: 'contacto',
      timestamps: false
    }
  );
  
export default Contacto;