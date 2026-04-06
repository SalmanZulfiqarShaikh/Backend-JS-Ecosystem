const User = require("../models/user");
const { setUser } = require("../services/auth"); 

async function handleUserSignup(req, res) {
    const { name, email, password, username } = req.body;
    
    try {
        await User.create({
            name,
            email,
            password,
            username,
        });
        return res.redirect("/login");
    } catch (error) {
        let errorMessage = "Registration failed. Please try again.";
        
        
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            errorMessage = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists!`;
        } 
        
        else if (error.name === "ValidationError") {
            errorMessage = Object.values(error.errors).map(el => el.message).join(". ");
        }

        
        return res.render("signup", { 
            error: errorMessage 
        });
    }
}

async function handleUserLogin(req, res) {
    const { identifier, password } = req.body;
    
    try {
       
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
            password: password, 
        });

        if (!user) {
            return res.render("login", { error: "Invalid username/email or password" });
        }

        
        const token = setUser(user);
        res.cookie("uid", token);
        return res.redirect("/home");

    } catch (error) {
        return res.render("login", { error: "Something went wrong during login." });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};