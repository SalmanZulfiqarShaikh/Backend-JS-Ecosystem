const mongoose = require("mongoose");

async function  connectToDB () {
      try {
           await mongoose.connect("mongodb://localhost:27017/apikeys")
           console.log("Connected to Our MongoDB");
      } catch (error) {
        console.log(error);
      }
}

module.exports = connectToDB;