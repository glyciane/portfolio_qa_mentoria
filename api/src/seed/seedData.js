const usuarioModel = require("../models/usuarioModel");
const categoriaModel = require("../models/categoriaModel");
const formaPagamentoModel = require("../models/formaPagamentoModel");
const despesaModel = require("../models/despesaModel");

/**
 * Retorna a data de "hoje - diasAtras" no formato YYYY-MM-DD.
 * Datas do seed são relativas à data atual (não fixas) para que o dataset
 * nunca viole a regra de negócio "data não pode ser futura", não importa
 * quando o projeto for executado.
 */
function dataRelativa(diasAtras) {
  const data = new Date();
  data.setDate(data.getDate() - diasAtras);
  return data.toISOString().split("T")[0];
}

/**
 * Reseta todos os "models" em memória e repopula com um dataset fixo e
 * conhecido. IDs são fixos de propósito para facilitar asserts em testes
 * automatizados (ex.: GET /despesas/2 sempre deve retornar o Uber).
 */
function seedData() {
  usuarioModel.resetar();
  categoriaModel.resetar();
  formaPagamentoModel.resetar();
  despesaModel.resetar();

  usuarioModel.criar({
    nome: "Glyciane Silva Santos",
    email: "glyciane@teste.com",
    senha: "123456",
  });

  categoriaModel.criar({ id: 1, nome: "Alimentação" });
  categoriaModel.criar({ id: 2, nome: "Transporte" });
  categoriaModel.criar({ id: 3, nome: "Lazer" });
  categoriaModel.criar({ id: 4, nome: "Saúde" });
  categoriaModel.criar({ id: 5, nome: "Moradia" });

  formaPagamentoModel.criar({ id: 1, nome: "Pix" });
  formaPagamentoModel.criar({ id: 2, nome: "Dinheiro" });
  formaPagamentoModel.criar({ id: 3, nome: "Cartão de Crédito" });
  formaPagamentoModel.criar({ id: 4, nome: "Cartão de Débito" });

  despesaModel.criar({
    valor: 89.9,
    descricao: "Supermercado",
    data: dataRelativa(2),
    categoriaId: 1,
    formaPagamentoId: 1,
    usuarioId: 1,
  });
  despesaModel.criar({
    valor: 45.0,
    descricao: "Uber",
    data: dataRelativa(1),
    categoriaId: 2,
    formaPagamentoId: 3,
    usuarioId: 1,
  });
  despesaModel.criar({
    valor: 120.0,
    descricao: "Cinema + jantar",
    data: dataRelativa(5),
    categoriaId: 3,
    formaPagamentoId: 1,
    usuarioId: 1,
  });
}

module.exports = { seedData };
