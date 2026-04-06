const crypto = require("crypto");
const sessionIdToUserMap = new Map();

function setUser(user) {
    const id = crypto.randomUUID();
    sessionIdToUserMap.set(id, user);
    return id;
}

function getUser(id) {
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
};
