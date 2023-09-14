const Express = require('express');
const app = Express();
const bodyParser = require('body-parser');
const PORT = 8080;

const { addToUsers, selectFromUsers, getIdValue } = require('./helpers');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(Express.static('public'));

app.get('/api/users', (req, res) => {
  selectFromUsers()
  .then(response => res.json(response))
  .catch(err => console.error(err));
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

app.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
