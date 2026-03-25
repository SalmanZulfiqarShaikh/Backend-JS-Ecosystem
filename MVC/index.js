const userRouter = require("./routes/user");
const connectDB = require("./connection");
const express = require("express");
const app = express();
const admin = "Salman Zulfiqar Shaikh"
const port = 3000;
const logReqRes = require("./middlewares");
const { handleGetAllUsers } = require("./controllers/user");

app.use(express.json());
app.use(logReqRes);
app.use("/user", userRouter);
connectDB();

app.listen(port, () => {
    console.log(`The Server has been Started by ${admin} at Port ${port}`);
});