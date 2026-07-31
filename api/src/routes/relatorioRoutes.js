const express = require("express");
const relatorioController = require("../controllers/relatorioController");
const autenticarToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/relatorios/mensal", autenticarToken, relatorioController.mensal);

module.exports = router;
