const { log } = require("console");
const fs = require("fs");
// fs is for file system  which allows us to perform file operations


fs.writeFileSync("./hello.txt", "testing shit"); //./ is for current directory,,,

console.log("file created");


fs.writeFileSync("./hello.txt", "testing shit again"); // it overwrites the file

fs.writeFile("./hello.txt", "testing shit again and again and again", (err) => {
    console.log(err);
})

fs.readFile("./contacts.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data);
}) // utf-8 is for encoding


fs.appendFile("./contacts.txt", `\n ${Date.now()}Aamir: +92336737398`, (err) => {
    if (err) {
        console.log(err);
    }
})


