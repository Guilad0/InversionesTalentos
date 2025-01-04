import { Model, DataTypes } from "sequelize";
import {sequelize} from "../database.js";

class Inversion extends Model { }
Inversion.init(
    {
      inversionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      solicitudInvId: {
        type: DataTypes.INTEGER,
      },
      clienteId: {
        type: DataTypes.INTEGER,
      },
      inversorId: {
        type: DataTypes.INTEGER,
      },
      monto: {
        type: DataTypes.INTEGER,
      },
      tipoGanancia: {
        type: DataTypes.ENUM('Monto fijo', 'Porcentual'),
      },
      gananciaEstimada: {
        type: DataTypes.DOUBLE,
      },
      fechaDeposito: {
        type: DataTypes.DATE,
      },
      fechaDevolucion: {
        type: DataTypes.DATE,
      },
      estado: {
        type: DataTypes.TINYINT,
      },
    },
    {
      sequelize,
      modelName: 'inversion',
      tableName: 'inversiones',
      timestamps: false
    }
  );
  
export default Inversion;