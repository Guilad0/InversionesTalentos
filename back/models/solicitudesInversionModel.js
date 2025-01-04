import { Model, DataTypes } from "sequelize";
import {sequelize} from "../database.js";

class SolicitudInversion extends Model { }
SolicitudInversion.init(
    {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      clienteId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false, 
        defaultValue: '0',
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fechaInicioRecaudacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fechaFinRecaudacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      monto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
      },
      cantidadPagos: {
        type: DataTypes.INTEGER,
        defaultValue: 0, 
        allowNull: false,
      },
      fechaInicioPago: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fechaFinPago: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      aprobado: {
        type: DataTypes.ENUM('Inicial','Pendiente','Aprobado','Rechazado'),
      },
      estado: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
      },
      observaciones: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      estadoInversion: {
        type: DataTypes.ENUM('Inicial','Pendiente','Proceso','Finalizado','Reversion'),
      },
      porcentajeInteres: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
      },
      canceladoPor: {
        type: DataTypes.STRING,
      },
      fechaSolicitud: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'solicitudes_inversion',
      tableName: 'solicitudes_inversion',
      timestamps: false
    }
  );
  
export default SolicitudInversion;