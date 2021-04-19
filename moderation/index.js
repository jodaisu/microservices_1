const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  const { id, postId, content } = data;

  if (type === 'CommentCreated') {
    const status = content.includes('orange') ? 'rejected' : 'approved';
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Moderations listening on 4003!');
});
