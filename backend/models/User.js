const conn = require("../database/conn"); // 1º Importa a conexão
const { DataTypes } = require("sequelize");

const User = conn.define(
  "User",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    senha: { type: DataTypes.STRING, allowNull: false },
    data_nascimento: { type: DataTypes.STRING },
    raca: { type: DataTypes.STRING },
    genero: { type: DataTypes.STRING },
    telefone: { type: DataTypes.STRING },
    comorbidades: { type: DataTypes.TEXT },
  },
  {
    freezeTableName: true,
    tableName: "Users", // Alterado para 'Users' para bater com o log anterior
  },
);

module.exports = User;
