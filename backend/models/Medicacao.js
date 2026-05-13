const conn = require("../database/conn");
const { DataTypes } = require("sequelize");

const Medicacao = conn.define(
  "medicacao",
  {
    id_medicacao: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_medicacao: { type: DataTypes.STRING, allowNull: false },
    dosagem: { type: DataTypes.STRING },
    descricao: { type: DataTypes.STRING },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    inicio_medicacao: { type: DataTypes.DATE },
    primeiraDose: { type: DataTypes.DATE },
    frequencia: { type: DataTypes.INTEGER, allowNull: false },
    dataInicio: { type: DataTypes.DATE },
    status: { type: DataTypes.BOOLEAN },
  },
  {
    freezeTableName: true,
    tableName: "medicacaos", // Alterado para bater com o plural que o Sequelize busca
  },
);

module.exports = Medicacao;
