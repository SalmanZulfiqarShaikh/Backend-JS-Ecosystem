const mongoose = require("mongoose");


const apiSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        createdBy:{
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
             },
},{timestamps: true})

module.exports = mongoose.model("Api", apiSchema);