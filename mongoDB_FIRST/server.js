const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 3333;

// Express Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connecting with MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/postsdb")
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log("MongoDB Error:", err));

// Post schema
const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    country: { 
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Post = mongoose.model('posts', postSchema); 

// ========================================
// MIDDLEWARE
// ========================================

// Validation for POST (all fields required)
function validatePostCreation(req, res, next) {
    const { author, post, email, country, gender } = req.body;

    if (!author || !post || !email || !country || !gender) {
        return res.status(400).json({ 
            error: "Missing required fields: author, post, email, country, gender" 
        });
    }

    next();
}

// ========================================
// ROUTES
// ========================================

// Root
app.get("/", (req, res) => {
    res.send(`Welcome to Our API! Server running on port ${port}`);
});

// GET all posts (NO validation needed - no body!)
app.get("/posts", async (req, res) => {
    try {
        const allPosts = await Post.find({}); 
        res.json(allPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET post by ID
app.get("/posts/:id", async (req, res) => { 
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create post (WITH validation)
app.post('/posts', validatePostCreation, async (req, res) => {
    try {
        const { author, post, email, country, gender } = req.body;

        const newPost = await Post.create({
            author,
            post,
            email,
            country,
            gender
        });

        return res.status(201).json({ 
            msg: "Post created successfully", 
            post: newPost
        });
    } catch (error) {
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(409).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: error.message });
    }
});

// PATCH update post by ID (NO strict validation - allow partial updates)
app.patch('/posts/:id', async (req, res) => { 
    try {
        const postId = req.params.id;
        const updates = req.body;

        // Check if updates object is empty
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json({ status: "updated", post: updatedPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE post by ID (NO validation needed - just ID in params)
app.delete('/posts/:id', async (req, res) => { 
    try {
        const postId = req.params.id;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json({ status: "deleted", post: deletedPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port} ✅`);
});