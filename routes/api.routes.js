class ApiRoutes {
  router = require("express").Router();
  constructor() {
    this.#initializeRoutes();
  }
  #initializeRoutes() {
    this.router.route("/add/type").post(async (req, res, next) => {
      try {
        const pool = res.app.get("pool");
        const { type } = req.body;
        if (!type) throw new Error("Required data not provided");
        const data = await pool.query(
          "INSERT INTO rodzaj (nazwa_rodzaj) VALUES (?)",
          [req.body.type.toString().trim().toLowerCase()]
        );

        return res.status(201).json({ error: false, success: true });
      } catch (error) {
        return res.status(500).json({ error: true, success: false });
      }
    });
  }
}
module.exports = ApiRoutes;
