const formaPagamentoModel = require("../models/formaPagamentoModel");

function listarFormasPagamento() {
  return formaPagamentoModel.listarTodos();
}

module.exports = { listarFormasPagamento };
