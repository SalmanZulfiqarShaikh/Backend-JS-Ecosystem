const express = require('express');
const port = 3000;
const app = express();


 app.get("/",(req,res)=> {
      if (req.query.name) {
         res.send(`Hello, ${req.query.name} !`)
      } else res.send("Hey There Munna Bhau")
 })


 app.get("/about",(req,res)=>{
     res.send("Hey Youre on the about page")
 })
app.listen(port,()=>{
     console.log("Server started on Port " + port);
     
})