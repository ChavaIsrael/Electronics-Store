const mongoose = require("mongoose");

//User Cart schema with the user cart details 
const UserCart = mongoose.model(
  "UserCart",
  new mongoose.Schema({
    userEmail: String,
    itemId: Number,
    itemCount: Number
  }, { timestamps: true })
);

module.exports = UserCart;