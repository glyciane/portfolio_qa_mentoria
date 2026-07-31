/**
 * "Model" do usuário — armazenamento em memória.
 * Não há banco de dados real: os dados vivem só enquanto o processo Node
 * estiver rodando, e são repopulados pelo seed a cada início/reset.
 */

let usuarios = [];
let proximoId = 1;

function listarTodos() {
  return usuarios;
}

function buscarPorEmail(email) {
  return usuarios.find((u) => u.email === email);
}

function buscarPorId(id) {
  return usuarios.find((u) => u.id === id);
}

function criar({ nome, email, senha }) {
  const usuario = { id: proximoId++, nome, email, senha };
  usuarios.push(usuario);
  return usuario;
}

function resetar() {
  usuarios = [];
  proximoId = 1;
}

module.exports = {
  listarTodos,
  buscarPorEmail,
  buscarPorId,
  criar,
  resetar,
};
