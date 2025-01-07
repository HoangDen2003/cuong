const { Sequelize } = require('sequelize');
require('dotenv').config(); // Import dotenv để đọc biến môi trường từ .env file

const db = new Sequelize({
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
});

module.exports = db;
