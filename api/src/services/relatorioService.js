const despesaModel = require("../models/despesaModel");
const categoriaModel = require("../models/categoriaModel");
const { ErroValidacao } = require("./errors");

function relatorioMensal(mes) {
  if (!mes || !/^\d{4}-\d{2}$/.test(mes)) {
    throw new ErroValidacao("Parâmetro 'mes' deve estar no formato YYYY-MM");
  }
  const [, mesStr] = mes.split("-");
  const mesNum = Number(mesStr);
  if (mesNum < 1 || mesNum > 12) {
    throw new ErroValidacao("Parâmetro 'mes' deve estar no formato YYYY-MM");
  }

  const despesasDoMes = despesaModel.listarTodos().filter((d) => d.data.startsWith(mes));

  const totalGasto = despesasDoMes.reduce((soma, d) => soma + d.valor, 0);

  const totaisPorCategoria = {};
  for (const despesa of despesasDoMes) {
    const categoria = categoriaModel.buscarPorId(despesa.categoriaId);
    const nomeCategoria = categoria ? categoria.nome : "Desconhecida";
    totaisPorCategoria[nomeCategoria] = (totaisPorCategoria[nomeCategoria] || 0) + despesa.valor;
  }

  const porCategoria = Object.entries(totaisPorCategoria).map(([categoria, total]) => ({
    categoria,
    total: Number(total.toFixed(2)),
  }));

  return {
    mes,
    totalGasto: Number(totalGasto.toFixed(2)),
    porCategoria,
  };
}

module.exports = { relatorioMensal };
