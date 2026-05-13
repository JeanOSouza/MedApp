const { Sequelize } = require("sequelize");
require("pg"); // força o carregamento do pg

const conn = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

module.exports = conn;
