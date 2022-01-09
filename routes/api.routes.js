class ApiRoutes {
  router = require("express").Router();
  constructor() {
    this.#initializeRoutes();
  }
  #initializeRoutes() {
    // Add
    this.router.route("/add/type").post(async (req, res, next) => {
      try {
        const pool = res.app.get("pool");
        const { type } = req.body;
        if (!type) throw new Error("Required data not provided");
        const data = await pool.query(
          "INSERT INTO rodzaj (nazwa_rodzaj) VALUES (?)",
          [type.toString().trim().toLowerCase()]
        );

        return res.status(201).json({ error: false, success: true });
      } catch (error) {
        return res.status(500).json({ error: true, success: false });
      }
    });
    this.router.route("/add/status").post(async (req, res, next) => {
      try {
        const pool = res.app.get("pool");
        const { status } = req.body;
        if (!status) throw new Error("Required data not provided");
        const data = await pool.query(
          "INSERT INTO status (nazwa_status) VALUES (?)",
          [status.toString().trim().toLowerCase()]
        );

        return res.status(201).json({ error: false, success: true });
      } catch (error) {
        return res.status(500).json({ error: true, success: false });
      }
    });
    this.router.route("/add/project").post(async (req, res, next) => {
      try {
        const pool = res.app.get("pool");
        const {
          type,
          state,
          projectNumber,
          subject,
          start,
          end,
          amount,
          tips,
        } = req.body;
        const endProject = end === "" || !end ? null : end;
        const data = await pool.query(
          "INSERT INTO `projekt`(`id_rodzaj`, `id_status`, `nr_projekt`, `temat_projekt`, `data_rozpoczecia`, `data_zakonczenia`, `kwota`, `uwagi`) VALUES ((SELECT id_rodzaj FROM rodzaj where nazwa_rodzaj=?),(SELECT id_status FROM status where nazwa_status=?),?,?,?,?,?,?)",
          [type, state, projectNumber, subject, start, endProject, amount, tips]
        );
        return res.status(201).json({ error: false, success: true });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, success: false });
      }
    });

    // Edit
    this.router.route("/edit/status").put(async (req, res, next) => {
      try {
        const pool = res.app.get("pool");
        const { status, id } = req.body;
        if (!status || !id) throw new Error("Required data not provided");
        await pool.query(
          "UPDATE `status` SET `nazwa_status`=? WHERE id_status=?",
          [status.toString().trim().toLowerCase(), id]
        );
        return res.status(200).json({ error: false, success: true });
      } catch (error) {
        return res.status(500).json({ error: true, success: false });
      }
    });
    this.router.route("/edit/type").put(async (req, res, next) => {
      try {
        const pool = res.app.get("pool");
        const { type, id } = req.body;
        if (!type || !id) throw new Error("Required data not provided");
        await pool.query(
          "UPDATE `rodzaj` SET `nazwa_rodzaj`=? WHERE id_rodzaj=?",
          [type.toString().trim().toLowerCase(), id]
        );
        return res.status(200).json({ error: false, success: true });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, success: false });
      }
    });
    // Delete
    this.router.route("/delete/type").delete(async (req, res, next) => {
      try {
        const pool = res.app.get("pool");
        const { id } = req.body;
        if (!id) throw new Error("Required data not provided");
        await pool.query("DELETE FROM `rodzaj` WHERE id_rodzaj=?", [id]);
        return res.status(200).json({ error: false, success: true });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, success: false });
      }
    });
    this.router.route("/delete/status").delete(async (req, res, next) => {
      try {
        const pool = res.app.get("pool");
        const { id } = req.body;
        if (!id) throw new Error("Required data not provided");
        await pool.query("DELETE FROM `status` WHERE id_status=?", [id]);
        return res.status(200).json({ error: false, success: true });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, success: false });
      }
    });
  }
}
module.exports = ApiRoutes;
