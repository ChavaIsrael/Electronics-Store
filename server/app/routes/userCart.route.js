const controller = require("../controllers/userCart.controller");

module.exports = function (app) {
  app.post("/usersCart", controller.createUserCart);
  app.delete("/usersCart", controller.deleteUserCart);
  app.put("/usersCart", controller.updateUserItem);
  app.get("/usersCart", controller.getItemsOfUser);
};
