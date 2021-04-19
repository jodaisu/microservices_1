const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      ...posts[id],
    },
  });

  res.status(201).json(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Posts microservice listening on PORT 4000...');
});
