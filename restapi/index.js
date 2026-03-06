const express = require("express");

const app = express();

const port = 8080;

const users = require('./testingdata.json');

const fs = require('fs');
const { log } = require("console");


app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.get("/",(req,res)=>{
      res.send(`Welcome to our API ! We have started the server at port ${port}`)
})
app.route("/users").get((req,res)=>{

    const listItems = users
        .map(user => `<li style="color:#b8860b;">${user.name}</li>`)
        .join("");

    const html = `
    <html>
        <body>
            <h2>Users List</h2>
            <ul>
                ${listItems}
            </ul>
        </body>
    </html>
    `;

    res.send(html);
}).post((req,res)=>{
    const body = req.body
    console.log(body);
    const newUser = {id: users.length + 1, ...body }
    users.push(newUser)
    fs.writeFileSync("./testingdata.json",JSON.stringify(users,null,2))
    res.send({ status: "success", user: newUser });
}).patch((req,res)=>{
    const change = req.body;
    console.log(change);
    const user = users.find(u => u.id === change.id)

    if (!user) return res.status(404).json({ error: "User not found" });

    Object.assign(user,change);
    fs.writeFileSync("./testingdata.json",JSON.stringify(users,null,2));
    res.send({ status: "success", user });
}).delete((req,res)=>{
    const {id} = req.body;
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ error: "User not found" });

    const deletedUser = users.splice(index, 1)[0]; // remove user from array
    fs.writeFileSync("./testingdata.json", JSON.stringify(users, null, 2));
    res.json({ status: "deleted", user: deletedUser });
})
app.get(("/users/id/:id"),(req,res)=>{
      const id = Number(req.params.id)
      const user = users.find(u => u.id === id)
      if(!user){
         return res.send("User not found")
      }
      res.send(user.name)
})
app.get(("/users/name/:name"),(req,res)=>{
     const name = req.params.name.toLowerCase()
     const user = users.find(u => u.name.toLowerCase() === name)
     res.send(`${user.id}.${user.name} `)
})

app.get("/users/company/:company",(req,res)=>{
     const company = req.params.company.toLowerCase()
     const filteredUsers = users.filter(u => u.company && u.company.toLowerCase() === company)

     if(filteredUsers.length === 0) return res.send("No users found")

     const listItems = filteredUsers
        .map(u => `<li style="color:#b8860b;">${u.name}</li>`)
        .join("")

     const html = `
     <html>
        <body>
            <h2>${company.charAt(0).toUpperCase() + company.slice(1)} Users</h2>
            <ul>
                ${listItems}
            </ul>
        </body>
     </html>
     `
     res.send(html)
})

app.get("/users/username/:username",(req,res)=>{
     const username = req.params.username.toLowerCase()
     const filteredUsers = users.filter(u => u.username && u.username.toLowerCase() === username)

     if(filteredUsers.length === 0) return res.send("No users found")

     const listItems = filteredUsers
        .map(u => `<li style="color:#b8860b;">${u.name}</li>`)
        .join("")

     const html = `
     <html>
        <body>
            <h2>${username.charAt(0).toUpperCase() + username.slice(1)} Users</h2>
            <ul>
                ${listItems}
            </ul>
        </body>
     </html>
     `
     res.send(html)
})

app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})

