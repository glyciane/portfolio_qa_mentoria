const despesaModel = require("../models/despesaModel");
const categoriaModel = require("../models/categoriaModel");
const formaPagamentoModel = require("../models/formaPagamentoModel");
const { ErroNaoEncontrado, ErroValidacao } = require("./errors");

function validarCamposDespesa({ valor, descricao, data, categoriaId, formaPagamentoId }) {
  if (typeof valor !== "number" || Number.isNaN(valor)) {
    throw new ErroValidacao("Campo 'valor' deve ser numérico");
  }
  if (valor <= 0) {
    throw new ErroValidacao("Campo 'valor' deve ser maior que zero");
  }

  if (typeof descricao !== "string" || descricao.trim().length === 0) {
    throw new ErroValidacao("Campo 'descricao' é obrigatório");
  }

  if (!data || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    throw new ErroValidacao("Campo 'data' deve estar no formato YYYY-MM-DD");
  }
  const dataDespesa = new Date(`${data}T00:00:00`);
  if (Number.isNaN(dataDespesa.getTime())) {
    throw new ErroValidacao("Campo 'data' inválido");
  }
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  if (dataDespesa > hoje) {
    throw new ErroValidacao("A data da despesa não pode ser futura");
  }

  if (!Number.isInteger(categoriaId)) {
    throw new ErroValidacao("Campo 'categoriaId' é obrigatório e deve ser um número inteiro");
  }
  if (!categoriaModel.buscarPorId(categoriaId)) {
    throw new ErroNaoEncontrado(`Categoria ${categoriaId} não encontrada`);
  }

  if (!Number.isInteger(formaPagamentoId)) {
    throw new ErroValidacao("Campo 'formaPagamentoId' é obrigatório e deve ser um número inteiro");
  }
  if (!formaPagamentoModel.buscarPorId(formaPagamentoId)) {
    throw new ErroNaoEncontrado(`Forma de pagamento ${formaPagamentoId} não encontrada`);
  }
}

function criarDespesa(dados, usuarioId) {
  validarCamposDespesa(dados);
  return despesaModel.criar({ ...dados, usuarioId });
}

function listarDespesas({ mes, categoriaId, formaPagamentoId, page = 1, limit = 10 }) {
  if (page < 1) throw new ErroValidacao("'page' deve ser maior ou igual a 1");
  if (limit < 1 || limit > 100) throw new ErroValidacao("'limit' deve estar entre 1 e 100");

  let resultado = despesaModel.listarTodos();

  if (mes !== undefined) {
    if (!/^\d{4}-\d{2}$/.test(mes)) {
      throw new ErroValidacao("Parâmetro 'mes' deve estar no formato YYYY-MM");
    }
    const [ano, mesNum] = mes.split("-").map(Number);
    if (mesNum < 1 || mesNum > 12) {
      throw new ErroValidacao("Parâmetro 'mes' deve estar no formato YYYY-MM");
    }
    resultado = resultado.filter((d) => d.data.startsWith(mes));
  }

  if (categoriaId !== undefined) {
    resultado = resultado.filter((d) => d.categoriaId === categoriaId);
  }

  if (formaPagamentoId !== undefined) {
    resultado = resultado.filter((d) => d.formaPagamentoId === formaPagamentoId);
  }

  const total = resultado.length;
  const inicio = (page - 1) * limit;
  const despesasPaginadas = resultado.slice(inicio, inicio + limit);

  return { total, page, limit, despesas: despesasPaginadas };
}

function buscarDespesaPorId(id) {
  const despesa = despesaModel.buscarPorId(id);
  if (!despesa) {
    throw new ErroNaoEncontrado(`Despesa ${id} não encontrada`);
  }
  return despesa;
}

function atualizarDespesaCompleta(id, dados) {
  buscarDespesaPorId(id); // garante 404 se não existir
  validarCamposDespesa(dados);
  return despesaModel.atualizar(id, dados);
}

function validarCamposParciais(dadosParciais) {
  // Valida apenas os campos que foram de fato enviados no PATCH — campos
  // já existentes na despesa e não tocados não são revalidados.
  if (dadosParciais.valor !== undefined) {
    if (typeof dadosParciais.valor !== "number" || Number.isNaN(dadosParciais.valor)) {
      throw new ErroValidacao("Campo 'valor' deve ser numérico");
    }
    if (dadosParciais.valor <= 0) {
      throw new ErroValidacao("Campo 'valor' deve ser maior que zero");
    }
  }

  if (dadosParciais.descricao !== undefined) {
    if (typeof dadosParciais.descricao !== "string" || dadosParciais.descricao.trim().length === 0) {
      throw new ErroValidacao("Campo 'descricao' não pode ser vazio");
    }
  }

  if (dadosParciais.data !== undefined) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dadosParciais.data)) {
      throw new ErroValidacao("Campo 'data' deve estar no formato YYYY-MM-DD");
    }
    const dataDespesa = new Date(`${dadosParciais.data}T00:00:00`);
    if (Number.isNaN(dataDespesa.getTime())) {
      throw new ErroValidacao("Campo 'data' inválido");
    }
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    if (dataDespesa > hoje) {
      throw new ErroValidacao("A data da despesa não pode ser futura");
    }
  }

  if (dadosParciais.categoriaId !== undefined) {
    if (!categoriaModel.buscarPorId(dadosParciais.categoriaId)) {
      throw new ErroNaoEncontrado(`Categoria ${dadosParciais.categoriaId} não encontrada`);
    }
  }

  if (dadosParciais.formaPagamentoId !== undefined) {
    if (!formaPagamentoModel.buscarPorId(dadosParciais.formaPagamentoId)) {
      throw new ErroNaoEncontrado(`Forma de pagamento ${dadosParciais.formaPagamentoId} não encontrada`);
    }
  }
}

function atualizarDespesaParcial(id, dadosParciais) {
  buscarDespesaPorId(id); // garante 404 se não existir
  validarCamposParciais(dadosParciais);
  return despesaModel.atualizar(id, dadosParciais);
}

function removerDespesa(id) {
  buscarDespesaPorId(id); // garante 404 se não existir
  despesaModel.remover(id);
}

module.exports = {
  criarDespesa,
  listarDespesas,
  buscarDespesaPorId,
  atualizarDespesaCompleta,
  atualizarDespesaParcial,
  removerDespesa,
};
