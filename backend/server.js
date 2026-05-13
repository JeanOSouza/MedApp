const express = require("express");
const cors = require("cors");
const conn = require("./database/conn");

// Importar Modelos
require("./models/User");
require("./models/Medicacao");
require("./models/Historico");
require("./models/associacoes");

// Importar Rotas
const userRoutes = require("./routes/userRoutes");
const medicacaoRoutes = require("./routes/medicacaoRoutes");
const authRoutes = require("./routes/authRoutes");
const historicoRoutes = require("./routes/historicoRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROTA DE TESTE (Acesse: https://medapp-backend.vercel.app/check)
app.get("/check", (req, res) => {
  res.json({ status: "Online", message: "Backend MedApp respondendo!" });
});

// ROTA DE SETUP DO BANCO (Acesse: https://medapp-backend.vercel.app/setup)
app.get("/setup", async (req, res) => {
  try {
    await conn.authenticate();
    await conn.sync({ alter: true });
    res.json({ status: "Sucesso", message: "Tabelas sincronizadas no Neon!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api/users", userRoutes); // Para registro/perfil
app.use("/api/meds", medicacaoRoutes); // Para cadastrar remédios
app.use("/api/auth", authRoutes); // APENAS para Login/Logout
app.use("/api/historico", historicoRoutes);

module.exports = app;
