const { pool } = require('../db/connection.js');

const addToUsers = function (id, email, password, firstname, lastname, username) {
  return new Promise((resolve, reject) => {
    const statement = 'INSERT INTO users (id, email, password, firstname, lastname, username, likes) VALUES ($1, $2, $3, $4, $5, $6, ARRAY[]::INTEGER[]);'
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
      .catch(error => console.log(error))
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

const pushToVoters = function (num, username) {
  return new Promise((resolve, reject) => {
    const statement = 'UPDATE posts SET voters = ARRAY_APPEND(voters, $1) WHERE id = $2';
    const values = [username, num];

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

const handlePostLikes = function(likes, id) {
  return new Promise((resolve, reject) => {
    const statement = 'UPDATE posts SET likes = $1 WHERE id = $2;'
    const values = [likes, id];

    pool.query(statement, values)
    .then(result => resolve(result))
    .catch(error => reject(error))
  })
}

const addToPosts = function(id, title, username, take, votes, totals, voters, likes, userId) {
  return new Promise((resolve, reject) => {
    const statement = 'INSERT INTO posts (id, title, username, take, votes, totals, voters, likes, userId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);'
    const values = [id, title, username, take, votes, totals, voters, likes, userId];

    pool.query(statement, values)
    .then(result => resolve(result))
    .catch(error => console.log(error))
  })
}

const getLikesNumber = function(postId) {
  return new Promise((resolve, reject) => {
    const statement = 'SELECT likes FROM posts WHERE id = $1;'
    const values = [postId];

    pool.query(statement, values)
    .then(result => resolve(result.rows[0].likes))
    .catch(error => console.error(error))
  })
}

const updateReplies = function(username, reply, id) {
  return new Promise((resolve, reject) => {
    const statement = "UPDATE posts SET replies = COALESCE(replies, ARRAY[]) || ARRAY[$1, $2] WHERE id = $3;"
    const values = [username, reply, id]

    pool.query(statement, values)
    .then(results => resolve(results))
    .catch(error => reject(error))
  })
}

const fetchReplies = function() {
  return new Promise((resolve, reject) => {
    const statement = 'SELECT * FROM replies;'
    pool.query(statement)
    .then(results => resolve(results.rows))
    .catch(error => console.error(error))
  })
}

const postToReplies = function(id, postId, reply, username, bool, original, userId) {
  return new Promise((resolve, reject) => {
    const statement = "INSERT INTO replies (id, postId, reply, username, likes, likers, post, originalpostid, userid) VALUES ($1, $2, $3, $4, 0, ARRAY[]::TEXT[], $5, $6, $7);"
    const values = [id, postId, reply, username, bool, original, userId];

    pool.query(statement, values)
    .then(response => resolve(response))
    .catch(error => {
      console.error(error)
    })
  })
}

const returnOperator = function(val) {
  if (val) {
    return '+'
  } else {
    return '-'
  }
}

const addLikeToReply = function(objectId, like) {
  return new Promise((resolve, reject) => {
    const statement = `UPDATE replies SET likes = likes ${returnOperator(like)} 1 WHERE id = $1;`
    const values = [objectId];

    pool.query(statement, values)
    .then(response => resolve(response))
    .catch(error => console.error(error))
  })
}

const pushUsernameToReplyLikes = function(username, id) {
  return new Promise((resolve, reject) => {
    const statement = 'UPDATE replies SET likers = ARRAY_APPEND(likers, $1) WHERE id = $2;'
    const values = [username, id];

    pool.query(statement, values)
    .then(result => resolve(result))
    .catch(error => console.log(error))
  })
}

const removeUsernameFromReplies = function(username, id) {
  return new Promise((resolve, reject) => {
    const statement = 'UPDATE replies SET likers = ARRAY_REMOVE(likers, $1) WHERE id = $2;'
    const values = [username, id];

    pool.query(statement, values)
    .then(results => resolve(results))
    .catch(error => console.error(error))
  })
}

const deleteFromPosts = function(id) {
  return new Promise((resolve, reject) => {
    const statement = "DELETE FROM posts WHERE id = $1;"
    const values = [id];

    pool.query(statement, values)
    .then(result => resolve(result))
    .catch(error => console.error(error))
  })
}

const removeReply = function(id) {
  return new Promise((resolve, reject) => {
    const statement = "DELETE FROM replies WHERE originalpostid = $1;"
    const values = [id];

    pool.query(statement, values)
    .then(result => resolve(result))
    .catch(error => console.error(error))
  })
}

const updateUser = function(originalValue, newValue, username) {
  return new Promise((resolve, reject) => {
    const statement = `UPDATE users SET ${originalValue} = $1 WHERE username = $2;`
    const values = [newValue, username];

    pool.query(statement, values).then(results => resolve(results))
    .catch(error => console.error(error))
  })
}

const updatePost = function(newValue, userId) {
  return new Promise((resolve, reject) => {
    const statement = "UPDATE posts SET username = $1 WHERE userid = $2;"
    const values = [newValue, userId];

    pool.query(statement, values).then(results => resolve(results))
    .catch(error => console.error(error))
  })
}

const updateReply = function(newValue, userId) {
  return new Promise((resolve, reject) => {
    const statement = "UPDATE replies SET username = $1 WHERE userid = $2;"
    const values = [newValue, userId];

    pool.query(statement, values).then(results => resolve(results))
    .catch(error => console.error(error))
  })
}

module.exports = { 
  addToUsers, 
  selectFromUsers, 
  getIdValue, 
  selectFromPosts, 
  getObj, 
  updateVotes, 
  changeTotalNumber, 
  pushToVoters, 
  addToUserLikes, 
  getUser, 
  deleteFromUserLikes, 
  handlePostLikes, 
  addToPosts, 
  getLikesNumber, 
  updateReplies, 
  fetchReplies, 
  postToReplies, 
  addLikeToReply, 
  pushUsernameToReplyLikes, 
  removeUsernameFromReplies,
  deleteFromPosts,
  removeReply,
  updateUser,
  updatePost, 
  updateReply
}