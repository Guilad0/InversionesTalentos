import { Model, DataTypes } from "sequelize";
import {sequelize} from "../database.js";

class Movimiento extends Model { }
Movimiento.init(
    {
      movimientoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tipo: {
        type: DataTypes.ENUM('Ingreso', 'Egreso'),
      },
      monto: {
        type: DataTypes.DOUBLE,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
      fechaSolicitud: {
        type: DataTypes.DATE,
      },
      fechaDesembolso: {
        type: DataTypes.DATE,
      },
      estado: {
        type: DataTypes.TINYINT,
      },
      inversionesId: {
        type: DataTypes.INTEGER,
      },
      solicitudesRetiroId: {
        type: DataTypes.INTEGER,
      },
      usuarioId: {
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: 'movimiento',
      tableName: 'movimientos',
      timestamps: false
    }
  );
  
export default Movimiento;