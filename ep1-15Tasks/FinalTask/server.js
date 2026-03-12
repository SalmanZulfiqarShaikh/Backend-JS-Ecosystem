const express = require('express');
const app = express();

const port = 6969;
app.use(express.json());

let posts = [];

function validatePost(req, res, next) {
    const { title, content, author } = req.body;
    
    if (!title || !content || !author) {
        return res.status(400).send({ 
            error: "Missing required fields: title, content, author" 
        });
    }
    
    next();
}

function checkAPI(req,res,next) {
    const apiKey = req.headers['x-api-key'];
    
    if (apiKey !== 'secret123') {
        return res.status(401).send({ error: "Unauthorized: Invalid API key" });
    }
    
    
    next();
}

app.post('/api/posts',validatePost,checkAPI,(req,res)=>{
      const newPost = {
         id: posts.length + 1,
         title: req.body.title,
         content: req.body.content,
         author: req.body.author,
         createdAt: new Date().toISOString(),
      }

      posts.push(newPost)
      res.status(201).send(newPost)
})

app.get('/api/posts',(req,res)=>{
    if (posts.length === 0) { 
        return res.send({ message: "No posts found" });
    }
    res.send(posts);
})

app.get('/api/posts/:id',(req,res)=>{
    const postId = req.params.id;
    const post = posts.find((p) => p.id === parseInt(postId));
    
    if (!post) {
        return res.status(404).send({ error: "Post not found" });
    }
    
    res.send(post);
})

app.put('/api/posts/:id',validatePost,checkAPI,(req,res)=>{
    const postId = req.params.id;
    const post = posts.find((p) => p.id === parseInt(postId));
    
    if (!post) {
        return res.status(404).send({ error: "Post not found" });
    }
    
    post.title = req.body.title;
    post.content = req.body.content;
    post.author = req.body.author;
    post.createdAt = posts[postIndex].createdAt
    res.send(post);
})

app.delete('/api/posts/:id',checkAPI,(req,res)=>{
    const postId = req.params.id;
    const post = posts.find((p) => p.id === parseInt(postId));
    
    if (!post) {
        return res.status(404).send({ error: "Post not found" });
    }
    
    posts = posts.filter((p) => p.id !== parseInt(postId));
    res.send(post);
})

app.get('/api/posts/author/:author',(req,res)=>{
    const author = req.params.author;
    const post = posts.find((p) => p.author === author);
    
    if (!post) {
        return res.status(404).send({ error: "Post not found" });
    }
    
    res.send(post);
})


app.listen(port,()=>{
    console.log(`Server has started on the port ${port}`);
})