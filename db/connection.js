const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  host: 'localhost',
  database: 'hottakedb',
  password: 'Greenbear12?',
  port: 5432
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database!');
  }
});

module.exports = { pool }