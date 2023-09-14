const { pool } = require('../db/connection.js');

const addToUsers = function(id, email, password, firstname, lastname, username) {
  return new Promise((resolve, reject) => {
    const statement = 'INSERT INTO users (id, email, password, firstname, lastname, username) VALUES ($1, $2, $3, $4, $5, $6);'
    const values = [id, email, password, firstname, lastname, username];
    pool.query(statement, values)
    .then(result => resolve(result.rows))
    .catch(err => {
      console.log(err);
      reject(err)
    })
  })
}

const selectFromUsers = function() {
  return new Promise((resolve, reject) => {
    const statement = 'SELECT * FROM users;'
    pool.query(statement)
    .then(result => resolve(result.rows))
    .catch(err => console.error(err))
  })
}

const getIdValue = function(arr) {
  return new Promise((resolve, reject) => {
    fetch(arr).then(result => result.json()).then(array => resolve(array[0].id + 1))
    .catch(err => console.error(err))
  })
}

module.exports = { addToUsers, selectFromUsers, getIdValue }