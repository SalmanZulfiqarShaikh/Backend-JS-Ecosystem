const express = require('express');
const users = require('./MOCK_DATA.json')
const app = express();

let port = 3000;



app.get('/',(req,res)=>{
     return res.send(users)
})


app.listen(port,()=>{
     console.log(`Server started at port ${port}`);
     
})