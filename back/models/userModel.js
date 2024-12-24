const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database.js");

class User extends Model { }
User.init(
    {
      usuarioId: {
        type: DataTypes.BIGINT,
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
      createAt: {
        type: DataTypes.DATE,
      },
      updateAt: {
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
      },
      resetPasswordExpires: {
        type: DataTypes.DOUBLE,
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
      porcentageRegistro: {
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
  
  module.exports = User;