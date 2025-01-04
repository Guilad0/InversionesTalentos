import { Model, DataTypes } from "sequelize";
import {sequelize} from "../database.js";

class CategoriaPersona extends Model { }
CategoriaPersona.init(
    {
        categoriaPersonaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      imagen: {
        type: DataTypes.STRING,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.TINYINT,
      },
      montoMinimoInversion: {
        type: DataTypes.INTEGER,
      },
      montoMaximoInversion: {
        type: DataTypes.INTEGER,
      },
      porcentajeInteres: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: 'categoria_persona',
      tableName: 'categoria_personas',
      timestamps: false
    }
  );
  
export default CategoriaPersona;