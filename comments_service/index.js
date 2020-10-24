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
    comments.push({ id: commentId, content, status: 'pending' })
    commentsByPostId[id] = comments
    //send it to both moderation service and query service 
    axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: id,
            status: 'pending'
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
    const { type, data } = req.body
    if (type === 'CommentModerated') {
        const { id, postId, content, status } = data
        const comments = commentsByPostId[postId]
        const comment = comments.find((comment) => {
            return comment.id === id
        })
        console.log(comment)
        console.log(status)
        comment["status"] = status
        axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id: id,
                postId: postId,
                content: content,
                status
            }
        }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log("I am in axios call of comments updated ")
            console.log(err)
        })
    }

    res.send({})
})


const port = 4001

app.listen(port, () => {
    console.log('Listening on port', port)
})