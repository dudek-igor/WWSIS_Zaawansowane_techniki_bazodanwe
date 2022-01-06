"use strict";

const http = require("http");
const express = require("express");
const config = require("config");
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
    this.#setupEjs();
    this.#mountRoutes();
    this.#createHttpServer();
  }
  //   async #connectToDatabase() {
  //     try {
  //       await sequelize.authenticate();
  //       logger.info(`============= Database =============`);
  //       logger.info("😎 Database connection has been established successfully.");
  //     } catch (error) {
  //       logger.error(`============= Database =============`);
  //       logger.error("☠️ Unable to connect to the database.");
  //       error.message && logger.error(`${error.message}`);
  //       process.exit(1);
  //     }
  //   }
  #setupEjs() {
    this.#app.set("view engine", "ejs");
    this.#app.use(express.static("public"));
  }

  #mountRoutes() {
    this.#app.use("/", new AppRoutes().router);
  }

  #createHttpServer() {
    this.#server = http.createServer(this.#app);
  }

  #initializeMiddlewares() {
    // this.app.disable("x-powered-by");
    // this.app.use(morgan(config.get("log.format"), { stream }));
    // this.app.use(
    //   cors({
    //     origin: config.get("cors.origin"),
    //     credentials: config.get("cors.credentials"),
    //   })
    // );
    // this.app.use(hpp());
    // this.app.use(helmet());
    // this.app.use(compression());
    // this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(cookieParser());
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
