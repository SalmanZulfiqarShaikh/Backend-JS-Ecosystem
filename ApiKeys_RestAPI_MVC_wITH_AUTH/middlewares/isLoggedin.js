const { getUser } = require("../services/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    if (!userUid) return res.redirect("/login");
    const user = getUser(userUid);
    if (!user) return res.redirect("/login");
    req.user = user;
    next();
}

// Redirect already-logged-in users away from public pages (e.g. / and /login)
async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    if (!userUid) return next();
    const user = getUser(userUid);
    if (!user) return next();
    return res.redirect("/home");
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};