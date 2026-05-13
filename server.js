const express = require("express");
const app = express();
const cors = require("cors");

const conn = require("./database/conn");
require("./models/associacoes");

const userRoutes = require("./routes/userRoutes");
const medicacaoRoutes = require("./routes/medicacaoRoutes");
const authRoutes = require("./routes/authRoutes");
const historicoRoutes = require("./routes/historicoRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync do banco antes de qualquer rota
conn.sync();

app.get("/hello", (req, res) => res.json({ ok: true }));

app.use("/v1", userRoutes);
app.use("/v1", medicacaoRoutes);
app.use("/v1", authRoutes);
app.use("/v1", historicoRoutes);

// Só sobe o servidor se estiver rodando localmente
if (require.main === module) {
  app.listen(3000, "0.0.0.0", () => {
    console.log("Servidor rodando na porta 3000");
  });
}

module.exports = app;
