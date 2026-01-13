const express = require('express');
require('dotenv').config();
const app = express();

const time = new Date();


const githubData = {
  "login": "SalmanZulfiqarShaikh",
  "id": 150047031,
  "node_id": "U_kgDOCPGJNw",
  "avatar_url": "https://avatars.githubusercontent.com/u/150047031?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/SalmanZulfiqarShaikh",
  "html_url": "https://github.com/SalmanZulfiqarShaikh",
  "followers_url": "https://api.github.com/users/SalmanZulfiqarShaikh/followers",
  "following_url": "https://api.github.com/users/SalmanZulfiqarShaikh/following{/other_user}",
  "gists_url": "https://api.github.com/users/SalmanZulfiqarShaikh/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/SalmanZulfiqarShaikh/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/SalmanZulfiqarShaikh/subscriptions",
  "organizations_url": "https://api.github.com/users/SalmanZulfiqarShaikh/orgs",
  "repos_url": "https://api.github.com/users/SalmanZulfiqarShaikh/repos",
  "events_url": "https://api.github.com/users/SalmanZulfiqarShaikh/events{/privacy}",
  "received_events_url": "https://api.github.com/users/SalmanZulfiqarShaikh/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Salman",
  "company": "Eocean Pvt. Ltd.",
  "blog": "salmanzulfi.dev",
  "location": "Pakistan",
  "email": null,
  "hireable": true,
  "bio": "I build stuff.",
  "twitter_username": null,
  "public_repos": 25,
  "public_gists": 0,
  "followers": 12,
  "following": 11,
  "created_at": "2023-11-06T14:10:13Z",
  "updated_at": "2026-01-12T14:36:50Z"
};

app.get('/welcomePage',(req,res) => {
     res.send(`<h1>Welcome to Manify Global</h1> <br> <p>The largest AI agency in Pakistan</p>`)
})

app.get('/', (req, res) => {
    res.send('Karachi Kings');
})

app.get('/baazar', (req, res) => {
       res.json({
           email: 'support@baazar.com',
           phone: '+92 300 1234567'
       })
})

app.get('/github', (req, res) => {
     res.json({
  username: "SalmanZulfiqarShaikh",
  platform: "GitHub"
});

})
//app.METHOD(PATH, HANDLER) 
app.get('/login', (req,res) => {
    res.send('<h1>Please Login at Manify/</h1>')
});

app.get('/data', (req,res) => {
    res.json(githubData);
})

app.get('/about', (req,res) => {
    res.send('<h1>About Manify</h1><p>Manify is a platform for learning and growth.</p>')
})

app.get('/time', (req,res) => {
    const currentTime = time.toLocaleTimeString();
    res.send(`<h1>Current Time is: ${currentTime}</h1>`)
})

app.get('/profile', (req,res) => {
     res.json({
        name: "Salman",
        age: 19,
        uni: "UBIT",
        married: false,
        role: "SWE",
     })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server file loaded");
    console.log(`Example app listening at http://localhost:${process.env.PORT || 3000}`);
});