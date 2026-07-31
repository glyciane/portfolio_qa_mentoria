const express = require("express");
const categoriaController = require("../controllers/categoriaController");
const autenticarToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/categorias", autenticarToken, categoriaController.listar);

module.exports = router;
