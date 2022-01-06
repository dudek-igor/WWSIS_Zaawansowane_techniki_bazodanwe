const ApiRoutes = require("./api.routes");
const ViewsRoutes = require("./views.routes");

class AppRoutes {
  router = require("express").Router();
  constructor() {
    this.#initializeRoutes();
    this.#initializeViews();
  }
  #initializeRoutes() {
    this.router.use("/api/v1/", new ApiRoutes().router);
  }
  #initializeViews() {
    this.router.use("/", new ViewsRoutes().router);
  }
}
module.exports = AppRoutes;
