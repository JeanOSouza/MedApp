const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const historicoController = require("../controller/Historico");

// ROTAS FIXAS PRIMEIRO

router.get("/historico/ultimas", auth, historicoController.listAll);

router.get("/historico/todos", auth, historicoController.listAll);

// ROTA DINÂMICA POR ÚLTIMO

router.get("/historico/:id_medicacao", auth, historicoController.list);

module.exports = router;
