const fs = require("fs");

fs.appendFile("hello.txt", "Hello World", (err) => {
    if (err) {
        console.log(err);
    }
    console.log("File created successfully");
});


fs.readFile("hello.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data);
})


fs.unlink("hello.txt", (err) => {
    if (err) {
        console.log(err);
    }
    console.log("File deleted successfully");
})

// the difference between sync and not sync is that sync allows us to 