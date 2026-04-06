const express = require("express");
const { handleCreateApi } = require("../controllers/api");
const { restrictToLoggedinUserOnly } = require("../middlewares/isLoggedIn");
const router = express.Router();

router.post("/", restrictToLoggedinUserOnly, handleCreateApi);

module.exports = router;