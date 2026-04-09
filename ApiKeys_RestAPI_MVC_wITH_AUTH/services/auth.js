const jwt = require("jsonwebtoken");
const secretKey = "yoyohoneysingh";

function setUser(user) {
    const payload = {
        ...user
    };
    

    return jwt.sign(payload, secretKey, {expiresIn: "1m"});
}

function getUser(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};