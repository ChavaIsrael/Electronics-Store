const mongoose = require("mongoose");

//Item schema with the Item details 
const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    id: Number,
    itemName: String,
    itemCost: String,
    itemDescription: String,
    itemImage: String,
    itemCategory: String
  }, { timestamps: true })
);

module.exports = Item;