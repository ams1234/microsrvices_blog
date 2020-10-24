const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const app = express()
const axios = require('axios')


app.use(cors())
app.use(express.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    const id = req.params.id
    res.send(commentsByPostId[id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const id = req.params.id
    const { content } = req.body
    const commentId = randomBytes(4).toString('hex')

    const comments = commentsByPostId[id] || []
    comments.push({ id: commentId, content })
    commentsByPostId[id] = comments
    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: id
        }
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    })
    res.send(commentsByPostId[id])
})

app.post('/events', (req, res) => {
    console.log("Event received", req.body.type)

    res.send({})
})


const port = 4001

app.listen(port, () => {
    console.log('Listening on port', port)
})