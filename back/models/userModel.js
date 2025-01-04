import { Model, DataTypes } from "sequelize";
import {sequelize} from "../database.js";

class User extends Model { }
User.init(
    {
      usuarioId: {
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
      correo: {
        type: DataTypes.STRING,
      },
      codigoPais: {
        type: DataTypes.STRING,
      },
      numeroTelefono: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      paisResidencia: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      edad: {
        type: DataTypes.INTEGER,
      },
      aceptaTerminos: {
        type: DataTypes.TINYINT,
      },
      categoriaPersonaId: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      rol: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      estado: {
        type: DataTypes.TINYINT,
      },
      codVerificacion: {
        type: DataTypes.STRING,
      },
      verificado: {
        type: DataTypes.TINYINT,
      },
      saldoTotal: {
        type: DataTypes.DOUBLE,
      },
      registradoPor: {
        type: DataTypes.STRING,
      },
      aprobado: {
        type: DataTypes.TINYINT,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        field: 'resetPasswordToken',
      },
      resetPasswordExpires: {
        type: DataTypes.DOUBLE,
        field: 'resetPasswordExpires',
      },
      genero: {
        type: DataTypes.STRING,
      },
      imagen: {
        type: DataTypes.STRING,
      },
      video: {
        type: DataTypes.STRING,
      },
      porcentajeRegistro: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'usuario',
      tableName: 'usuarios',
      timestamps: false
    }
);
  
export default User;