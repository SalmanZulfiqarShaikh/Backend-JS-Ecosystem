const express = require("express");
const { cre } = require("../controllers/api");
const router = express.Router();

router.post("/",createNewAPI);

module.exports = router;