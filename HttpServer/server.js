const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {

    const logTime = new Date().toLocaleString('en-GB');

    fs.appendFile("logs.txt", logTime + " - " + req.url + "    "  +  res.statusCode + res.statusMessage + "\n", (err) => {

        switch (req.url) {
            case "/":
                res.write("Hello World !!!");
                break;
            case "/about":
                res.write("About Page");
                break;
            case "/contact":
                res.write("Contact Page");
                break;
            default:
                res.write("404 Not Found");
                break;
        }

        res.end();
        if (err) {
            console.log(err);
        }
    });

});

myServer.listen(8000, () => {
    console.log("Server running on port 8000");
});