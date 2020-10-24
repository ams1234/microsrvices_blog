const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())


app.post('/events', (req, res) => {
    console.log(req.body)
    const { type, data } = req.body

    if (type === 'CommentCreated') {
        const status = data.content.includes('bad') ? 'rejected' : 'approved'

        axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status
            }
        }).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })
    }
    res.send({})
})

app.listen(4003, () => {
    console.log("listening on port 4003")
})