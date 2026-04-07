const sessionIdToUserMap = new Map();
const crypto = require("crypto");


function setUser(user) {
    const id = crypto.randomUUID();
    
    sessionIdToUserMap.set(id, {
        user,
        expiresAt: Date.now() + 1 * 60 * 1000
    });

    return id;
}

function getUser(id) {
    const session = sessionIdToUserMap.get(id);

    if (!session) return null;

    if (session.expiresAt < Date.now()) {
        sessionIdToUserMap.delete(id);
        return null;
    }

    return session.user;
}

module.exports = {
    setUser,
    getUser
};