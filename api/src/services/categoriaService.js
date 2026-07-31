const categoriaModel = require("../models/categoriaModel");

function listarCategorias() {
  return categoriaModel.listarTodos();
}

module.exports = { listarCategorias };
