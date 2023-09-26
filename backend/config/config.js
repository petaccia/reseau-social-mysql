module.exports = {
  development: {
    username: "root",
    password: "laure12++*84",
    database: "réseau_social",
    host: "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT,
    migrationStorageTableName: "migrations",
  },
  test: {
    username: "root",
    password: "laure12++*84",
    database: "réseau_social",
    host: "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT,
    migrationStorageTableName:"migrations",
  },
  production: {
    username: "root",
    password: "laure12++*84",
    database: "réseau_social",
    host: "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT,
    migrationStorageTableName: "migrations",
  },
};
