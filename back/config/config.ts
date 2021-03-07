import dotenv from 'dotenv';
dotenv.config();

export const development = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
};

export const production = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
};

export const test = {
  username: "root",
  password: "",
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
};