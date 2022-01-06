"use strict";

const express = require("express");
const config = require("config");

class AppServer {
  constructor() {
    this.app = express();
    this.port = config.get("app.port");
    this.env = config.get("app.env");
    // this.#connectToDatabase();
    // this.#initializeMiddlewares();
    // this.#initializeRoutes();
    // this.#initializeErrorHandling();
    // this.#createHttpServer();
    // this.#createSocketIo();
    // this.#initCronJobs();
    // this.serveReactAppForUnknowPaths();
  }

  async #connectToDatabase() {
    try {
      await sequelize.authenticate();
      logger.info(`============= Database =============`);
      logger.info("😎 Database connection has been established successfully.");
    } catch (error) {
      logger.error(`============= Database =============`);
      logger.error("☠️ Unable to connect to the database.");
      error.message && logger.error(`${error.message}`);
      process.exit(1);
    }
  }

  #createHttpServer() {
    this.server = http.createServer(this.app);
  }

  #initCronJobs() {
    this.cron = new Cron();
  }

  #initializeMiddlewares() {
    this.app.disable("x-powered-by");
    this.app.use(morgan(config.get("log.format"), { stream }));
    this.app.use(
      cors({
        origin: config.get("cors.origin"),
        credentials: config.get("cors.credentials"),
      })
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(cookieParser());
  }
  #initializeRoutes() {
    this.app.use("/api/v2", new ApiRoutes().router);
  }

  #initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`========= ENV: ${this.env} ==========`);
      console.log(`🚀 Server listening on the port ${this.port}`);
    });
  }
}

module.exports = AppServer;
