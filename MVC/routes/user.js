const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("User Route");
});

router.get("/profile", (req, res) => {
    res.send("User Profile");
});


router.get("/profile/:id", (req, res) => {
    res.send("User Profile" + req.params.id);
});

module.exports = router;