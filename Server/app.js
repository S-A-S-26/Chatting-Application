require('dotenv').config()
const express = require('express');
const app = express();

const http = require('http')
const http_server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(http_server, {
    cors: { origin: '*' }
})

const cors = require('cors');
const router = require('./router/router')
const path = require('path');
const { initiateSocket } = require('./socket/socket')
console.log('path join', path.join(__dirname, 'uploads'))

// const corsOptions = {
//     origin: ['https://your-netlify-app-url.netlify.app', 'http://localhost:5173', '*'], // Replace with actual Netlify URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     // credentials: true
// };

// app.use(cors(corsOptions))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', router)
app.use('/static', express.static(path.join(__dirname, 'uploads')));


const connectDb = require('./db/connectDb')

const port = 8000

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.get('/shyam', (req, res) => {
    res.status(200).send('Hello, World! This is Shyam')
})

app.post('/register', (req, res) => {
    const data = req.body
    console.log(data)
    res.status(200).send('Hello, World! This is Shyam')
})

// app.listen(port, function() {
//     console.log(`Server running at http://localhost:${port}`)
//     console.log('Press Ctrl + C to stop the server')
//     connectDb()
// })

// io.on('connection', (socket) => {
//     console.log("Socket running sucessfully", socket)
// })

initiateSocket(io)

http_server.listen(port, function() {
    console.log(`Server running at http://localhost:${port}`)
    console.log('Press Ctrl + C to stop the server')
    connectDb()
})

module.exports = { io }
