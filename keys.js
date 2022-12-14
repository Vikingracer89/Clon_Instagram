/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  database: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  jwtSecret: process.env.JWT_SECRET,
};
