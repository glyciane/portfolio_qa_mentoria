const formaPagamentoService = require("../services/formaPagamentoService");

function listar(req, res) {
  return res.status(200).json(formaPagamentoService.listarFormasPagamento());
}

module.exports = { listar };
