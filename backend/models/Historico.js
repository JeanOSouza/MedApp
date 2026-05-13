const conn = require("../database/conn"); // Importe no topo!
const { DataTypes } = require("sequelize");

const HistoricoMed = conn.define(
  "historico_med",
  {
    id_historico: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_medicacao: { type: DataTypes.INTEGER, allowNull: false },
    data_tomada: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    observacao: { type: DataTypes.STRING, allowNull: true },
  },
  {
    freezeTableName: true,
    tableName: "historico_meds",
  },
);

module.exports = HistoricoMed;
