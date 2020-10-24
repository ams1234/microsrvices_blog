const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(cors())
app.use(express.json())

const posts = {}
//this returns full list of posts and comments
app.get('/posts', (req, res) => {
    console.log(posts)
    res.send(posts)
})

const handleEvent = (type, data) => {
    if (type == 'PostCreated') {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }
    if (type == 'CommentCreated') {
        const { id, content, postId, status } = data
        const post = posts[postId]
        post.comments.push({ id, content, status })
    }
    if (type == 'CommentUpdated') {
        const { id, content, postId, status } = data
        const post = posts[postId]
        const comment = post.comments.find((comment) => {
            return comment.id == id
        })
        comment.status = status
        comment.content = content

    }
}
app.post('/events', (req, res) => {
    const { type, data } = req.body
    console.log(req.body)
    handleEvent(type, data)
    res.send({})
})

app.listen(4002, () => {
    console.log("listening on port 4002")
    axios.get('http://localhost:4005/events').then((res) => {
        for (const event in res.data) {
            const { type, data } = event
            handleEvent(type, data)
        }
    }).catch((err) => {
        console.log(err)
    })
})