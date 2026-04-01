const User = require("../models/user");

async function restrictToLoggedinUserOnly(req,res,next){
     const userUid = req.cookies?.uid;
     if(!userUid) return res.redirect("/login");
     const user = await User.findById(userUid);
     if(!user) return res.redirect("/login");
     
     req.user = user;
     return next();
}


module.exports = {
     restrictToLoggedinUserOnly,
};