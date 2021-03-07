import { Sequelize } from 'sequelize-typescript';
import {development, production} from '../config/config';

const env = process.env.NODE_ENV || 'development';
const db = {}

const sequelize =
  env === 'development'
    ? new Sequelize(
        development.database,
        development.username,
        development.password
      )
    : new Sequelize(
        production.database,
        production.username,
        production.password,
      );

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
