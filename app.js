"use strict";

const http = require("http");
const express = require("express");
const config = require("config");
const { pool } = require("./database");
const AppRoutes = require("./routes");

class AppServer {
  #app;
  #server;
  constructor() {
    this.#app = express();
    this.port = config.get("app.port");
    this.env = config.get("app.env");
    this.#setupApp();
  }
  #setupApp() {
    this.#setupViews();
    this.#setupMiddlewares();
    this.#mountRoutes();
    this.#createHttpServer();
  }
  #setupViews() {
    this.#app.set("view engine", "ejs");
    this.#app.use(express.static("public"));
  }
  #setupMiddlewares() {
    this.#app.disable("x-powered-by");
    this.#app.set("pool", pool);
    this.#app.use(express.json());
    // this.#app.use(express.urlencoded({ extended: true }));
  }

  #mountRoutes() {
    this.#app.use("/", new AppRoutes().router);
  }

  #createHttpServer() {
    this.#server = http.createServer(this.#app);
  }

  #initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  listen() {
    this.#server.listen(this.port, () => {
      console.log(`========= ENV: ${this.env} ==========`);
      console.log(`🚀 Server listening on the port ${this.port}`);
    });
  }
}

module.exports = AppServer;
