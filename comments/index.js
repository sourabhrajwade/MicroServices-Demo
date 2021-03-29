const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentByPostIds = {}

app.get('/posts/:id/comments', (req,res) => {

    res.send(commentByPostIds[req.params.id] || []);

});

app.post('/posts/:id/comments',async (req,res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentByPostIds[req.params.id] || [];

    comments.push({id: commentId, content});

    commentByPostIds[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    })
    res.status(201).send(comments);

});

app.post('/events', (req, res) => {
    console.log('received event', req.body.type);

    res.send({});
})

app.listen(4001, () => {
    console.log('Listening to post 4001');
})