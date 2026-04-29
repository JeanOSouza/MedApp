const Historico = require("../models/Historico");
const Medicacao = require("../models/Medicacao"); // Importar para o Join
const { registroDose } = require("./Medicacao");

module.exports = {
  async list(req, res) {
    try {
      const id_usuario = req.userId; // Certifique-se que o middleware de auth está passando o ID

      const historico = await Historico.findAll({
        // 🚨 IMPORTANTE: Se você não configurou as associações (belongsTo) no Model,
        // remova o "include" e tente buscar apenas os dados puros para testar:
        order: [["data_tomada", "DESC"]],
      });

      console.log("Histórico encontrado:", historico.length);
      return res.json(historico);
    } catch (error) {
      console.error("Erro no Backend:", error.message);
      return res.status(500).json({ error: "Erro ao buscar histórico" });
    }
  },
  async listAll(req, res) {
    try {
      const userId = req.userId;

      const doses = await HistoricoMed.findAll({
        include: [
          {
            model: Medicacao,
            where: { id_usuario: userId }, // 🔥 Filtro de segurança: apenas as doses DESTE usuário
            required: true, // Isso transforma em um INNER JOIN, trazendo apenas registros válidos
          },
        ],
        order: [["data_tomada", "DESC"]],
      });

      res.json(doses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
