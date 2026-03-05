const { log } = require('console');
const express = require('express');

const app = express();

const port = 8000;

const fs = require("fs");

const file = require("./MOCK_DATA.json")

app.use(express.urlencoded({ extended: false })); // basically this is middleware and it helps to return the data in json

app.use(express.json());


app.route('/users').get((req,res)=>{
    res.send(file);
}).post((req,res)=>{
    const body = req.body
    const newUser = {id: file.length+1,...body}
    file.push(newUser)
    fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));
    res.json({ status: "success", user: newUser });
})


app.listen(port,()=>{
    console.log(`port started on ${port}`);
})