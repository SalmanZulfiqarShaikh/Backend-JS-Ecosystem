const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Karachi Kings');
})

app.get('/github', (req, res) => {
     res.send('Salman Zulfiqar Shaikh');
})

app.get('/login', (req,res) => {
    res.send('<h1>Please Login at Manify')
});


app.get('/about', (req,res) => {
    res.send('<h1>About Manify</h1><p>Manify is a platform for learning and growth.</p>')
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});