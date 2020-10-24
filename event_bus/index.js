const express = require('express')
const axios = require('axios')
//const bodyParser=require('body-parser')

const app = express()

app.use(express.json())

//when a post requrest is sent to the event bus we simply take the body and send it to all the other services 
app.post('/events', (req, res) => {
    const event = req.body
    console.log("in event bus", event)
    axios.post('http://localhost:3055/events', event)//post service
    axios.post('http://localhost:4001/events', event)//comment service
    axios.post('http://localhost:4002/events', event)//query service

    res.send({ status: 'OK' })
})

app.listen(4005, () => {
    console.log("Listening on port 4005")
})