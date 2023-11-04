const { Pool } = require('pg');
require('dotenv').config();

console.log("This is the test: ", process.env.DB_HOST);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:' + err);
  } else {
    console.log('Connected to the database!');
  }
});

module.exports = { pool }