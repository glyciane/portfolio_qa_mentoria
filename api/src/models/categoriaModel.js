/**
 * "Model" de categorias — lista fixa, somente leitura pela API.
 */

let categorias = [];
let proximoId = 1;

function listarTodos() {
  return categorias;
}

function buscarPorId(id) {
  return categorias.find((c) => c.id === id);
}

function criar({ id, nome }) {
  const categoria = { id: id ?? proximoId++, nome };
  categorias.push(categoria);
  return categoria;
}

function resetar() {
  categorias = [];
  proximoId = 1;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  resetar,
};
