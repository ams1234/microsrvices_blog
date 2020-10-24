const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const posts = {}
//this returns full list of posts and comments
app.get('/posts', (req, res) => {
    console.log(posts)
    res.send(posts)
})


app.post('/events', (req, res) => {
    const { type, data } = req.body
    console.log(req.body)
    if (type == 'PostCreated') {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }
    if (type == 'CommentCreated') {
        const { id, content, postId } = data
        const post = posts[postId]
        post.comments.push({ id, content })
    }
    res.send({})
})

app.listen(4002, () => {
    console.log("listening on port 4002")
})