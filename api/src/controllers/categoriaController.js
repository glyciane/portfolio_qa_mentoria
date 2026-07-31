const categoriaService = require("../services/categoriaService");

function listar(req, res) {
  return res.status(200).json(categoriaService.listarCategorias());
}

module.exports = { listar };
