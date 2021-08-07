const mongoose = require("mongoose");

//User schema with the User details 
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    password: Number,
    email: String,
    phone: String,
    firstName: String,
    lastName: String
  }, { timestamps: true })
);

module.exports = User;