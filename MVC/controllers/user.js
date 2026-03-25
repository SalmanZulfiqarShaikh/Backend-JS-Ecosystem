const handleGetAllUsers = (req,res) => {
    return res.json({message: "All users"});
}

module.exports = {
    handleGetAllUsers,
}
