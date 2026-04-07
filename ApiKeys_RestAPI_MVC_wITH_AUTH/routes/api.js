const express = require("express");
const { handleCreateApi, handleDeleteApi } = require("../controllers/api");
const { restrictToLoggedinUserOnly } = require("../middlewares/isLoggedin");
const router = express.Router();

router.post("/", restrictToLoggedinUserOnly, handleCreateApi);
router.delete("/:id", restrictToLoggedinUserOnly, handleDeleteApi);




module.exports = router;