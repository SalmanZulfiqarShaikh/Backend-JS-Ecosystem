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

async function handleDeleteApi(req, res) {
    const id = req.params.id;
    
    // Only delete if the ID matches AND it belongs to the logged-in user
    await Api.findOneAndDelete({
        _id: id,
        createdBy: req.user._id 
    });
    
    return res.redirect("/home");
}
module.exports = {
    handleCreateApi,
    handleDeleteApi,
};