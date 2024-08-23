require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/router')
app.use(express())
app.use(express.json())
app.use(cors())
app.use('/api',router)


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