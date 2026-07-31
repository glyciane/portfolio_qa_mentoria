const express = require("express");
const formaPagamentoController = require("../controllers/formaPagamentoController");
const autenticarToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/formas-pagamento", autenticarToken, formaPagamentoController.listar);

module.exports = router;
