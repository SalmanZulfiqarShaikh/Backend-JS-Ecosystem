const express = require('express');
const app = express();
const port = 3000;

//  Parse JSON bodies
app.use(express.json());

const threads = [];

// ========================================
// MIDDLEWARE
// ========================================

function validateUser(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    
    if (apiKey !== 'secret123') {
        return res.status(401).send({ 
            error: "Unauthorized: Invalid API key" 
        });
    }
    
    next();
}

function validatePost(req, res, next) {
    const { author, thread } = req.body;
    
    if (!author || !thread) {
        return res.status(400).send({ 
            error: "Missing required fields: author, thread" 
        });
    }
    
    next();
}

// ========================================
// ROUTES
// ========================================

app.get("/", (req, res) => {
    res.send(`Server started on port ${port}`);
});

// GET all threads
app.get("/threads", (req, res) => {
    if (threads.length === 0) {
        return res.send({ message: "No threads yet" });
    }
    res.send(threads);
});

// CREATE thread
app.post("/threads", validateUser, validatePost, (req, res) => {
    const newThread = {
        id: threads.length + 1,
        author: req.body.author,
        thread: req.body.thread,
        createTime: new Date().toISOString(),
    };
    
    threads.push(newThread);
    res.status(201).send(newThread);
});

// UPDATE thread
app.put("/threads/:id", validateUser, validatePost, (req, res) => {
    const threadId = req.params.id;
    const threadIndex = threads.findIndex((t) => t.id === parseInt(threadId));
    
    if (threadIndex === -1) {
        return res.status(404).send({ error: "Thread not found" });
    }
    
    threads[threadIndex] = {
        id: parseInt(threadId),
        author: req.body.author,
        thread: req.body.thread,
        createTime: threads[threadIndex].createTime // Keep original
    };
    
    res.send(threads[threadIndex]);
});

// DELETE thread
app.delete("/threads/:id", validateUser, (req, res) => {
    const threadId = req.params.id;
    const threadIndex = threads.findIndex((t) => t.id === parseInt(threadId));
    
    if (threadIndex === -1) {
        return res.status(404).send({ error: "Thread not found" });
    }
    
    threads.splice(threadIndex, 1);
    res.send({ message: "Thread deleted successfully" });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});