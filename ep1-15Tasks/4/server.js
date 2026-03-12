const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs')
app.use(express.json());

const users = [];

function requestLogger(req, res, next) {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    fs.appendFile('logs.txt', `\n [${timestamp}] ${req.method} ${req.url} ` , (err,data)=>{
    })
    next(); 
}

// Apply to ALL routes
app.use(requestLogger);

function validateUser(req, res, next) {
    const { name, email, age } = req.body;
    
    if (!name || !email || !age) {
        return res.status(400).send({ 
            error: "Missing required fields: name, email, age" 
        });
    }
    
  
    next();
}


function checkApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    
    if (apiKey !== 'secret123') {
        return res.status(401).send({ error: "Unauthorized: Invalid API key" });
    }
    
    
    next();
}



app.post("/api/users", checkApiKey, validateUser, (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    };
    
    users.push(newUser);
    res.status(201).send(newUser);
});


app.get("/api/users", (req, res) => {
    if (users.length === 0) { 
        return res.send({ message: "No users found" });
    }
    res.send(users);
});


app.get("/api/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find((u) => u.id === parseInt(userId));
    
    if (!user) {
        return res.status(404).send({ error: "User not found" });
    }
    
    res.send(user);
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
