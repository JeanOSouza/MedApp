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

// USAR AS ROTAS
app.use("/api", userRoutes);
app.use("/api", medicacaoRoutes);
app.use("/api", authRoutes);
app.use("/api", historicoRoutes);

// Rota de teste para ver se a API está online
app.get("/", (req, res) => {
  res.send("API do MedApp rodando na Vercel!");
});

// AJUSTE PARA VERCEL: O servidor não deve "ouvir" uma porta fixa
// A Vercel gerencia as portas automaticamente.
if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  conn.sync().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Servidor local rodando na porta ${PORT}`);
    });
  });
}

// Exportar o app para a Vercel
module.exports = app;
