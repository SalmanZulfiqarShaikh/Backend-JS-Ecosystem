const http = require("http");
const port = 3000;
const server = http.createServer((req, res) => {
     switch (req.url) {
        case "/":
            res.write("Welcome to my server");
            break;
        case "/about":
            res.write("This is the about page");
            break;
        case "/contact":
            res.write("Contact us at email@example.com");
            break;
     
        default:
            res.write("404 Not Found");
            break;
     }
     res.end();
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});