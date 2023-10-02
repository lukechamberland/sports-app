const { pool } = require('../db/connection.js');

const addToUsers = function (id, email, password, firstname, lastname, username) {
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

const selectFromUsers = function () {
  return new Promise((resolve, reject) => {
    const statement = 'SELECT * FROM users;'
    pool.query(statement)
      .then(result => resolve(result.rows))
      .catch(err => console.error(err))
  })
}

const getIdValue = function (arr) {
  return new Promise((resolve, reject) => {
    fetch(arr).then(result => result.json()).then(array => resolve(array[0].id + 1))
      .catch(err => console.error(err))
  })
}

const selectFromPosts = function () {
  return new Promise((resolve, reject) => {
    const statement = 'SELECT * FROM posts;'
    pool.query(statement)
      .then(result => resolve(result.rows))
      .catch(error => console.error(error))
  })
}

const getObj = function (num) {
  return new Promise((resolve, reject) => {
    const statement = `SELECT * FROM posts WHERE id = ${num};`
    pool.query(statement)
      .then((data) => resolve(data.rows[0]))
      .catch(error => console.error(error))
  })
}

const updateVotes = function (num) {
  return new Promise((resolve, reject) => {
    getObj(num)
      .then((obj) => {
        const statement = `UPDATE posts SET votes = ${obj.votes + 1} WHERE id = ${num};`
        pool.query(statement)
          .then(data => resolve(data))
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  })
}

const changeTotalNumber = function (num, value) {
  return new Promise((resolve, reject) => {
    getObj(num).then((obj) => {
      const statement = `UPDATE posts SET totals = ${value} WHERE id = ${num};`
      pool.query(statement)
        .then(data => resolve(data))
        .catch(error => console.error(error))
    })
  })
}

const pushToVoters = function (num, array) {
  return new Promise((resolve, reject) => {
    const statement = 'UPDATE posts SET voters = $1 WHERE id = $2';
    const values = [array, num];

    return pool.query(statement, values)

      .then(data => resolve(data))
      .catch(error => {
        console.log(error);
        reject(error);
      })
  })
}

const addToUserLikes = function(postId, username) {
  return new Promise((resolve, reject) => {
    const statement = 'UPDATE users SET likes = ARRAY_APPEND(likes, $1) WHERE username = $2;'
    const values = [postId, username];
    
    pool.query(statement, values)
    .then(data => resolve(data))
    .catch(error => reject(error))
  })
}

const getUser = function(id) {
  return new Promise((resolve, reject) => {
    const statement = 'SELECT * FROM users WHERE id = $1;'
    const value = [id];

    pool.query(statement, value)
    .then(result => resolve(result))
    .catch(error => console.error(error))
  })
}

const deleteFromUserLikes = function(postId, username) {
  return new Promise((resolve, reject) => {
    const statement = 'UPDATE users SET likes = ARRAY_REMOVE(likes, $1) WHERE username = $2;'
    const values = [postId, username];

    pool.query(statement, values)
    .then(result => resolve(result))
    .catch(error => console.error(error))
  })
}

module.exports = { addToUsers, selectFromUsers, getIdValue, selectFromPosts, getObj, updateVotes, changeTotalNumber, pushToVoters, addToUserLikes, getUser, deleteFromUserLikes }