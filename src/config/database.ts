import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const { DB_HOST, DB_USER, DB_NAME } = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  throw new Error('Database environment variables are not properly configured');
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, '', {
  host: DB_HOST,
  dialect: 'mysql',
});

