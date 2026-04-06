const express = require("express");
const app = express();
const port = 3000;
const connectToDB = require("./conncet");
const cookieParser = require("cookie-parser")
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const apiRouter = require("./routes/api");


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);

connectToDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});