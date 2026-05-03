const express = require("express");
const app = express();
const multer = require("multer");
const port = 3000;

app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("test");
});

// to receive form data 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const path = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/");
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
});

const upload =  path.single("file");

app.post("/upload", upload, (req, res) => {
    console.log(req.file);
    res.send("File uploaded successfully");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});