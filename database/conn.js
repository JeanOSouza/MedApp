const { Sequelize } = require("sequelize");

const conn = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

module.exports = conn;
