const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
     name:{
          type: String,
          required: true,
          trim: true,
          minlength: 3,
          maxlength: 20,
     },
     email:{
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true,

     },
     password:{
          type: String,
          required: true,
          minlength: 8,
          maxlength: 16,

     },
     username: {
         type: String,
         required: true,
         unique: true,
         trim: true,
         minlength: 3,
         maxlength: 16,
         lowercase: true,
         match: /^[a-zA-Z0-9_]+$/,
     }
     
},{timestamps: true})

module.exports = mongoose.model("User",UserSchema);