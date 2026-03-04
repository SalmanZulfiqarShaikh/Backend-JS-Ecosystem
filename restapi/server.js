const express = require('express');
const fs = require("fs");
let users = require('./MOCK_DATA.json'); // use let so we can reassign
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send("Welcome to our API");
});

// GET + POST + PATCH + DELETE
app.route('/users')
    .get((req, res) => {
        res.json(users);
    })
    .post((req, res) => {
        const body = req.body;
        const newUser = { id: users.length + 1, ...body };
        users.push(newUser);
        fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));
        res.json({ status: "success", user: newUser });
    })
    .patch((req, res) => {
        const change = req.body;
        const user = users.find(u => u.id === change.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        Object.assign(user, change);
        fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));
        res.json({ status: "updated", user });
    })
    .delete((req, res) => {
        const { id } = req.body;
        const exists = users.some(u => u.id === id);
        if (!exists) return res.status(404).json({ error: "User not found" });
        users = users.filter(u => u.id !== id);
        fs.writeFileSync("./MOCK_DATA.json", JSON.stringify(users, null, 2));
        res.json({ status: "deleted", id });
    });

// Get user by ID
app.get('/users/id/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

// Get users by gender
app.get('/users/gender/:gender', (req, res) => {
    const gender = req.params.gender.toLowerCase();
    const filtered = users.filter(u => u.gender.toLowerCase() === gender);
    res.json(filtered);
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});