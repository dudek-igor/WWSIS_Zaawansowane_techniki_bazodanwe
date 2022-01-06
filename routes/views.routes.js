class ViewsRoutes {
  router = require("express").Router();
  constructor() {
    this.#initializeRoutes();
  }
  #initializeRoutes() {
    this.router.route("/projects-list").get((req, res) => {
      res.render("pages/projects-list", {});
    });
    this.router.route("/add-status").get((req, res) => {
      res.render("pages/add-status", {});
    });
    this.router.route("/add-type").get((req, res) => {
      res.render("pages/add-type", {});
    });
    this.router.route("/edit-status").get((req, res) => {
      res.render("pages/edit-status", {});
    });
    this.router.route("/edit-type").get((req, res) => {
      res.render("pages/edit-type", {});
    });
    this.router.route("/add-project").get((req, res) => {
      res.render("pages/add-project", {});
    });
    this.router.route("/sort-type").get((req, res) => {
      res.render("pages/sort-type", {});
    });
    this.router.route("/sort-status").get((req, res) => {
      res.render("pages/sort-status", {});
    });
    this.router.route("/edit-project").get((req, res) => {
      res.render("pages/edit-project", {});
    });
    this.router.route("/").get((req, res) => {
      res.render("pages/index", {});
    });
  }
}
module.exports = ViewsRoutes;
