const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.get("/users", controller.getUserByQuery);
  app.post("/users", controller.createUser);
  app.put("/users", controller.updateUser);
};
