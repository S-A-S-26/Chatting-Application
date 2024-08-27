require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/router')
const path = require('path');
console.log('path join',path.join(__dirname, 'uploads'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api',router)
app.use('/static',express.static(path.join(__dirname, 'uploads')));


const connectDb = require('./db/connectDb')

const port = 8000

app.get('/', (req, res) =>{
    res.send('Hello, World!')
})

app.get('/shyam', (req, res) =>{
    res.status(200).send('Hello, World! This is Shyam')
})

app.post('/register', (req, res) =>{
    const data= req.body
    console.log(data)
    res.status(200).send('Hello, World! This is Shyam')
})

app.listen(port, function(){
    console.log(`Server running at http://localhost:${port}`)
    console.log('Press Ctrl + C to stop the server')
    connectDb()
})