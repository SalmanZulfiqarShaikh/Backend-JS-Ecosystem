const mongoose = require("mongoose");

const connectDB = async () => {
     try {
          await mongoose.connect("mongodb://localhost:27017/authwithurl");
          console.log("MongoDB connected Successfully");
     } catch (error) {
          console.log(error);
     }
};

module.exports = connectDB;