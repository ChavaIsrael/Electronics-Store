const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.User = require("./user.model.js");
db.UserCart = require("./userCart.model");
db.Item = require("./item.model");

module.exports = db;
