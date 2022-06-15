const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/books', (req, res) => {
    res.send('This is a new book');
})


app.listen(8000, (req, res) => {
    console.log("server is listening")
})

