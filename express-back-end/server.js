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
  deleteFromUserLikes } = require('./helpers');

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
  const array = req.body.array;
  const id = req.body.id;

  updateVotes(postId)
    .then((result => console.log(result)))
    .catch(error => console.error(error))

  changeTotalNumber(postId, total)
    .then(result => console.log(result))
    .catch((error) => console.error(error))

  pushToVoters(id, array)
    .then(result => {
      console.log(result)
      console.log(array);
      console.log(id);
    })
    .catch(error => console.error(error))
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

app.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
