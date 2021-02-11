const Sequelize = require("sequelize");
const pkg = require("../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");
let dbConfig = {};

// SSL can only be used in production environment
// run the following command 'echo $NODE_ENV', it should return 'production'
// if we're in production, use SSL
if (process.env.NODE_ENV === "production") {
  dbConfig = {
    logging: false,
    operatorsAliases: 0,
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  };
}

// otherwise run in development mode
else {
  dbConfig = {
    logging: false,
    operatorsAliases: 0,
    dialect: "postgres",
    protocol: "postgres",
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  dbConfig
);

module.exports = db;

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === "test") {
  after("close database connection", () => db.close());
}
