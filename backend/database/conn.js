const { Sequelize } = require("sequelize")

const conn = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db"
})

module.exports = conn