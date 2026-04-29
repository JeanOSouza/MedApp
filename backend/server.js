const express = require("express");
const app = express();
const cors = require("cors");

const conn = require("./database/conn");
require("./models/associacoes");

// IMPORTAR AS ROTAS
const userRoutes = require("./routes/userRoutes");
const medicacaoRoutes = require("./routes/medicacaoRoutes");
const authRoutes = require("./routes/authRoutes");
const historicoRoutes = require("./routes/historicoRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// IMPORTA ASSOCIAÇÕES
require("./models/associacoes");

// USAR AS ROTAS
app.use("/api", userRoutes);
app.use("/api", medicacaoRoutes);
app.use("/api", authRoutes);
app.use("/api", historicoRoutes);

conn.sync().then(() => {
  app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor rodando na porta 3000");
  });
});
