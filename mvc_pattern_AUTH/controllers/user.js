const User = require("../models/user");

async function handleUserSignup(req,res){
     const body = req.body;
     try {
         await User.create({
              name: body.name,
              email: body.email,
              password: body.password,
         });
         return res.redirect("/login");
     } catch (error) {
         if (error.code === 11000) {
             return res.render("signup", { error: "Email already exists" });
         }
         return res.render("signup", { error: "Something went wrong" });
     }
}

async function handleUserLogin(req,res){
     const body = req.body;
     const user = await User.findOne({email: body.email, password: body.password});
     if(!user) return res.render("login", { error: "Invalid Email or Password" });
     
     res.cookie("uid", user._id);
     return res.redirect("/home");
}
module.exports = {
     handleUserSignup,
     handleUserLogin,
};