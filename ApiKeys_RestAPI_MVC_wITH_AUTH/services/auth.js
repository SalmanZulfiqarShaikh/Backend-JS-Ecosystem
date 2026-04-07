const crypto = require("crypto");
const sessionIdToUserMap = new Map();

function setUser(user) {
    const id = crypto.randomUUID();
    sessionIdToUserMap.set(id, user);
    return id;
}

// Automatically delete after 1 minute
setTimeout(() => {
    sessionIdToUserMap.delete(id);
}, 1 * 60 * 1000);

function getUser(id) {
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
};
