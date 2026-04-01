const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const author = "Obviously Me";
const connectDB = require("./connect");
const URL = require("./models/url");
const userRouter = require("./routes/user");
const urlRouter = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectDB();

app.use("/", staticRoute);
app.use("/url", restrictToLoggedinUserOnly, urlRouter);

app.get("/:shortId",async (req,res)=>{
     const shortId = req.params.shortId;
     const entry = await URL.findOneAndUpdate(
          {shortId},
          {
               $push: {
                    visitedHistory: {
                         timestamp: Date.now(),
                    },
               },
          }
     );
     res.redirect(entry.redirectURL);
});

app.use("/user",userRouter);

app.listen(port,()=>{
     console.log(`The server has started on port ${port} by the GOAT Himself ${author}` );
});