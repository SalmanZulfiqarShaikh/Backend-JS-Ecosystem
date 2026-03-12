const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }

  const words = data.trim().split(/\s+/); 
  const wordCount = words.length;

  console.log(`Word count: ${wordCount}`);

  
  fs.appendFile("output.txt", `Word count: ${wordCount}`, (err) => {
    if (err) {
      console.log("Error writing file:", err);
      return;
    }
    console.log("Output written successfully!");
  });
});


fs.readFile("salman.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }

  const letterrs = data.trim().split("");
  const letterCount = letterrs.length;

  console.log(`Letter count: ${letterCount}`);

  fs.appendFile("output.txt", `Letter count: ${letterCount}`, (err) => {
    if (err) {
      console.log("Error writing file:", err);
      return;
    }
    console.log("Output written successfully!");
  });
});