import { Model, DataTypes } from "sequelize";
import {sequelize} from "../database.js";

class InformacionInversionista extends Model { }
InformacionInversionista.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idInversionista: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      nombreCompleto: {
        type: DataTypes.STRING,
      },
      dni: {
        type: DataTypes.STRING,
      },
      tipoDni: {
        type: DataTypes.STRING,
      },
      domicilio: {
        type: DataTypes.STRING,
      },
      ciudad: {
        type: DataTypes.STRING,
      },
      situacionLaboral: {
        type: DataTypes.STRING,
      },
      fuenteDeIngresos: {
        type: DataTypes.STRING,
      },
      imagenSelfie: {
        type: DataTypes.STRING,
      },
      imagenPasaporteAnv: {
        type: DataTypes.STRING,
      },
      imagenPasaporteRev: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'informacion_inversionista',
      tableName: 'informacion_inversionista',
      timestamps: false
    }
  );
  
  export default InformacionInversionista;