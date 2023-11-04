const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.database_url 
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:' + err);
  } else {
    console.log('Connected to the database!');
  }
});

module.exports = { pool }