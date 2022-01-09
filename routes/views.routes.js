class ViewsRoutes {
  router = require("express").Router();
  constructor() {
    this.#initializeRoutes();
  }
  #initializeRoutes() {
    this.router.route("/projects-list").get(async (req, res) => {
      try {
        const pool = res.app.get("pool");
        const projects = await pool.query(
          "SELECT * FROM `projekt` v1 INNER JOIN rodzaj v2 ON v1.id_rodzaj=v2.id_rodzaj INNER JOIN `status` v3 ON v1.id_status=v3.id_status;"
        );
        return res.render("pages/projects-list", { projects });
      } catch (error) {
        return res.status(500).json({ error: true, success: false });
      }
    });
    this.router.route("/add-status").get((req, res) => {
      res.render("pages/add-status", {});
    });
    this.router.route("/add-type").get((req, res) => {
      res.render("pages/add-type", {});
    });
    this.router.route("/edit-status").get(async (req, res) => {
      try {
        const pool = res.app.get("pool");
        const status = await pool.query("SELECT * FROM `status`");
        return res.render("pages/edit-status", { status });
      } catch (error) {
        return res.status(500).json({ error: true, success: false });
      }
    });
    this.router.route("/edit-type").get(async (req, res) => {
      try {
        const pool = res.app.get("pool");
        const types = await pool.query("SELECT * FROM `rodzaj`");
        return res.render("pages/edit-type", { types });
      } catch (error) {
        return res.status(500).json({ error: true, success: false });
      }
    });
    this.router.route("/add-project").get(async (req, res) => {
      try {
        const pool = res.app.get("pool");
        const status = await pool.query("SELECT * FROM `status`");
        const types = await pool.query("SELECT * FROM `rodzaj`");
        return res.render("pages/add-project", { status, types });
      } catch (error) {
        return res.status(500).json({ error: true, success: false });
      }
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
