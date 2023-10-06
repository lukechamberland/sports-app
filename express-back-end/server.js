const Express = require('express');
const app = Express();
const bodyParser = require('body-parser');
const PORT = 8080;

const { addToUsers,
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
  removeUsernameFromReplies } = require('./helpers');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Express.static('public'));

app.get('/api/users', (req, res) => {
  selectFromUsers()
    .then(response => {
      response.sort((a, b) => a.id - b.id);
      res.json(response);
    })
    .catch(err => console.error(err));
})

app.get('/api/posts', (req, res) => {
  selectFromPosts().then((response) => {
    response.sort((a, b) => a.id - b.id)
    res.json(response)
  })
    .catch(error => console.error(error))
})

app.post("/api/users", (req, res) => {
  selectFromUsers().then(array => {
    const id = array.length + 1;
    addToUsers(id, req.body.email, req.body.password, req.body.firstname, req.body.lastname, req.body.username);
  })
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "An error occurred while processing your request." });
    })
})

app.get("/api/posts/:id", (req, res) => {
  getObj(req.params.id).then(result => res.json(result))
    .catch(error => console.error(error))
})

app.post("/api/posts/:id", (req, res) => {
  const postId = req.params.id;
  const total = req.body.vote;
  const id = req.body.id;
  const like = req.body.like;
  const username = req.body.username;
  const plus = req.body.plus;
  const reply = req.body.reply;

  if (reply) {
    updateReplies(username, reply, id)
      .then(response => console.log(response))
      .catch(error => console.error(error))
  } else {
    if (like) {
      if (plus) {
        getLikesNumber(postId).then(num => {
          const newNum = num + 1;
          handlePostLikes(newNum, postId)
        })
          .then(result => console.log(result))
          .catch(error => console.error(error))
      } else {
        getLikesNumber(postId).then(num => {
          const newNum = num - 1;
          handlePostLikes(newNum, postId);
        })
          .then(result => console.log(result))
          .catch(error => console.error(error))
      }
    } else {
      updateVotes(postId)
        .then((result => console.log(result)))
        .catch(error => console.error(error))

      changeTotalNumber(postId, total)
        .then(result => console.log(result))
        .catch((error) => console.error(error))

      pushToVoters(id, username)
        .then(result => {
          console.log(result)
        })
        .catch(error => console.error(error))
    }
  }
})

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  getUser(id)
    .then(result => res.json(result.rows[0]))
    .catch(error => console.error(error))
})

app.post("/api/users/:id", (req, res) => {
  const newPostId = req.body.postId;
  const username = req.body.username;
  const add = req.body.add;

  if (add) {
    addToUserLikes(newPostId, username)
      .then(result => console.log(result))
      .catch(error => console.error(error))
  } else {
    deleteFromUserLikes(newPostId, username)
      .then(result => console.log(result))
      .catch(error => console.error(error))
  }
})

app.post("/api/posts", (req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const take = req.body.take;
  const votes = 0;
  const totals = 0;
  const likes = 0;
  const voters = [];

  const returnId = function(arr) {
    let highest = 0;
    for (let obj of arr) {
      if (highest < obj.id) {
        highest = obj.id;
      }
    }
    const newHighest = highest + 1;
    return newHighest;
  }

  selectFromPosts().then(array => {
    const id = returnId(array);
    addToPosts(id, title, username, take, votes, totals, voters, likes)
  })
    .then(result => console.log(result))
    .catch(error => console.log(error))
})

app.get("/api/replies", (req, res) => {
  fetchReplies().then(response => res.json(response.sort((a, b) => b.id - a.id))).catch(error => console.error(error));
});

app.post("/api/replies", (req, res) => {
  const postId = req.body.postId;
  const reply = req.body.reply;
  const username = req.body.username;
  const like = req.body.like;
  const objectId = req.body.objectId;
  const isReplyLike = req.body.isReplyLike;
  const replying = req.body.replying;

  if (isReplyLike) {
    if (like) {
      addLikeToReply(objectId, like)
        .then(results => console.log(results))
        .catch(error => console.error(error))

      pushUsernameToReplyLikes(username, objectId)
        .then(result => console.log(result))
        .catch(error => console.error(error))
    } else {
      addLikeToReply(objectId, like)
      .then(response => console.log(response))
      .catch(error => console.error(error))

      removeUsernameFromReplies(username, objectId)
    }
  } else {
    fetchReplies().then(result => {
      const id = result.length + 1;
      if (replying) {
        postToReplies(id, postId, reply, username, true);
      } else {
        postToReplies(id, postId, reply, username, false);
      }
    })
      .catch(error => { console.error(error) })
  }
})

app.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
