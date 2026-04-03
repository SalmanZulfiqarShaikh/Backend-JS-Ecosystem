const express = require("express");
const app = express();
const port = 3000;
const connectToDB = require("./conncet");

app.use(express.json());

connectToDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});