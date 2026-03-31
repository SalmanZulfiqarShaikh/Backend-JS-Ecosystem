const express = require("express");

const app = express();

const PORT = 4545;

const mongoose = require('mongoose');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());   


mongoose.connect("mongodb://127.0.0.1:27017/funnyMongo").then(()=> console.log("MongoDB has been connected Yayyy")).catch(err => console.log(`Error agya`, err))




app.listen(PORT,()=>{
     console.log(`Server Started on Port ${PORT}`);
})