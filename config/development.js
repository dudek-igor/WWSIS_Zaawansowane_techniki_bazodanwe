module.exports = {
  app: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
  dbConfig: {
    host: "db",
    port: 3306,
    user: "root",
    password: "root",
    database: "zaw_tech_baz",
  },
};
