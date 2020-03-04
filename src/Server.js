const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

// mongoose.connect('mongodb+srv://omnistack8:omnistack8@cluster0-lmjul.mongodb.net/omnistack8?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

mongoose.connect('mongodb://localhost:27017/omnistack8', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const server = express()

server.use(express.json())
server.use(routes)

server.listen(3333)