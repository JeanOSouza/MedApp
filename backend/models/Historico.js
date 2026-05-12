const conn = require("../database/conn");
const { DataTypes } = require("sequelize");

const HistoricoMed = conn.define("historico_med", {
  id_historico: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  id_medicacao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  data_tomada: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  observacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = HistoricoMed;
