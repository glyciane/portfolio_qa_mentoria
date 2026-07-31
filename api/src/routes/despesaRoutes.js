const express = require("express");
const despesaController = require("../controllers/despesaController");
const autenticarToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/despesas", autenticarToken, despesaController.criar);
router.get("/despesas", autenticarToken, despesaController.listar);
router.get("/despesas/:id", autenticarToken, despesaController.buscarPorId);
router.put("/despesas/:id", autenticarToken, despesaController.atualizar);
router.patch("/despesas/:id", autenticarToken, despesaController.atualizarParcial);
router.delete("/despesas/:id", autenticarToken, despesaController.remover);

module.exports = router;
