/**
 * "Model" de despesas — armazenamento em memória com operações de CRUD.
 */

let despesas = [];
let proximoId = 1;

function listarTodos() {
  return despesas;
}

function buscarPorId(id) {
  return despesas.find((d) => d.id === id);
}

function criar({ valor, descricao, data, categoriaId, formaPagamentoId, usuarioId }) {
  const despesa = {
    id: proximoId++,
    valor,
    descricao,
    data,
    categoriaId,
    formaPagamentoId,
    usuarioId,
    criadoEm: new Date().toISOString(),
  };
  despesas.push(despesa);
  return despesa;
}

function atualizar(id, dadosAtualizados) {
  const despesa = buscarPorId(id);
  if (!despesa) return null;
  Object.assign(despesa, dadosAtualizados);
  return despesa;
}

function remover(id) {
  const index = despesas.findIndex((d) => d.id === id);
  if (index === -1) return false;
  despesas.splice(index, 1);
  return true;
}

function resetar() {
  despesas = [];
  proximoId = 1;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  remover,
  resetar,
};
