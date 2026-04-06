const Api = require("../models/api");

async function handleCreateApi(req, res) {
    const body = req.body;
    await Api.create({
        name: body.name,
        value: body.value,
        createdBy: req.user._id,
    });
    return res.redirect("/home");
}

module.exports = {
    handleCreateApi,
};