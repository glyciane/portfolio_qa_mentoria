/**
 * "Model" de formas de pagamento — lista fixa, somente leitura pela API.
 */

let formasPagamento = [];
let proximoId = 1;

function listarTodos() {
  return formasPagamento;
}

function buscarPorId(id) {
  return formasPagamento.find((f) => f.id === id);
}

function criar({ id, nome }) {
  const formaPagamento = { id: id ?? proximoId++, nome };
  formasPagamento.push(formaPagamento);
  return formaPagamento;
}

function resetar() {
  formasPagamento = [];
  proximoId = 1;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  resetar,
};
