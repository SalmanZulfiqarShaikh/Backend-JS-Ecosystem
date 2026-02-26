const { log } = require("console");
const http = require("http");
const port = 9090
const url = require("url")



const server = http.createServer((req,res)=>{

    const myUrl = url.parse(req.url, true);
  
  console.log('Path:', myUrl.pathname);        // Logs the path
  console.log('Query params:', myUrl.query);    // Logs all query parameters
    
  const name = myUrl.query.name
    
      switch (myUrl.pathname) {
        case "/":
            res.write("This is the HomePage")
            break;
        case "/about":
            res.write(`Welcome to the About Page ${name}`)
            break;
        default:
            res.write("Seems like you entered the wrong Page!!!!!")
            break;
      }
      res.end();
})

server.listen(port,()=>{
     console.log("Server Started at port " + port);
})