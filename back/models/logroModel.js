import { Model, DataTypes } from "sequelize";
import {sequelize} from "../database.js";

class Logro extends Model { }
Logro.init(
    {
        logroId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      clienteId: {
        type: DataTypes.INTEGER,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.TINYINT,
      },
      fecha: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'logro',
      tableName: 'logros',
      timestamps: false
    }
  );
  
export default Logro;