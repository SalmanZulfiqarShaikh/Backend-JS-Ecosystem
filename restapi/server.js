const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ========================================
// MONGODB CONNECTION
// ========================================
mongoose.connect('mongodb://127.0.0.1:27017/myfirstdb')
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log("MongoDB Error:", err));

// ========================================
// SCHEMA & MODEL
// ========================================
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: { 
        type: String
    },
    gender: {
        type: String,
        required: true
    }
}, { timestamps: true });

// 
const User = mongoose.model('user', userSchema);

// ========================================
// ROUTES
// ========================================

// Root route
app.get('/', (req, res) => {
    res.send("Welcome to our API");
});

// GET all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create user
app.post('/users', async (req, res) => {
    try {
        const body = req.body;
        
        if (
            !body ||
            !body.firstName ||
            !body.lastName ||
            !body.email ||
            !body.gender ||
            !body.jobTitle
        ) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const newUser = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle
        });

        return res.status(201).json({ 
            msg: "success", 
            user: newUser 
        });
    } catch (error) {
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(409).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: error.message });
    }
});

// PATCH update user by ID
app.patch('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updates,
            { new: true, runValidators: true } // Return updated doc
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ status: "updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ status: "deleted", user: deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user by MongoDB ID
app.get('/users/id/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get users by gender
app.get('/users/gender/:gender', async (req, res) => {
    try {
        const gender = req.params.gender;
        const users = await User.find({ 
            gender: new RegExp(gender, 'i') // Case-insensitive
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});