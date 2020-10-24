const express = require('express')
//for random generation of id , we need the below package 
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()

const port = 3055

app.use(express.json())
app.use(cors())
let posts = {}

app.get('/posts', (req, res) => {
    res.json(posts)
})


app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body
    posts[id] = {
        id, title
    }

    axios.post('http://localhost:4005/events', {
        type: "PostCreated",
        data: {
            id, title
        }
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(err)
    })

    res.send(posts[id])
})

app.post('/events', (req, res) => {
    console.log("Received Event", req.body.type)
    res.send({})
})

app.listen(port, () => {
    console.log("Listening on 3055 port")
})

module.exports = app
