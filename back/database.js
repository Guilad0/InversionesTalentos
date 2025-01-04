import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql',
    define: {
        underscored: true
    },
    logging: console.log,
    dialectOptions: {
      connectTimeout: 10000, 
      ssl: false,
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('conectado con sequalize exito!.');
  } catch (error) {
    console.error('error al conectar con Sequelize:', error);
    console.error('Stack:', error.stack);
  }
};

export default { 
  sequelize, 
  connectDB
}; 
