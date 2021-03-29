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

    comments.push({id: commentId, content, status: 'Pending'});

    commentByPostIds[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'Pending'
        }
    })
    res.status(201).send(comments);

});

app.post('/events', (req, res) => {
    console.log('received event', req.body.type);

    const {type, data} = req.body;

    if (type === 'CommentModerated') {
        const {id, psotId, status} = data;

        const comments = commentByPostIds[postId];

        const comment = comments.find(comment 
            => {return comment.id === id;});
            comment.status = status;
        }

        comment.status = status;

    res.send({});
})

app.listen(4001, () => {
    console.log('Listening to post 4001');
})