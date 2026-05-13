const { Sequelize } = require("sequelize");
const pg = require("pg");

const conn = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

module.exports = conn;
