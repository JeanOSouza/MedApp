const HistoricoMed = require("../models/Historico");

module.exports = {
  async list(req, res) {
    try {
      const { id_medicacao } = req.params;

      const historico = await HistoricoMed.findAll({
        where: {
          id_medicacao,
        },

        order: [["data_tomada", "DESC"]],
      });

      return res.json(historico);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: error.message,
      });
    }
  },

  async listAll(req, res) {
    try {
      const historico = await HistoricoMed.findAll({
        order: [["data_tomada", "DESC"]],
      });

      return res.json(historico);
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        error: error.message,
      });
    }
  },
};
