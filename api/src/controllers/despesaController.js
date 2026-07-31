const despesaService = require("../services/despesaService");

function criar(req, res, next) {
  try {
    const despesa = despesaService.criarDespesa(req.body, req.usuarioId);
    return res.status(201).json(despesa);
  } catch (erro) {
    return next(erro);
  }
}

function listar(req, res, next) {
  try {
    const { mes, categoriaId, formaPagamentoId, page, limit } = req.query;

    const filtros = {
      mes,
      categoriaId: categoriaId !== undefined ? Number(categoriaId) : undefined,
      formaPagamentoId: formaPagamentoId !== undefined ? Number(formaPagamentoId) : undefined,
      page: page !== undefined ? Number(page) : 1,
      limit: limit !== undefined ? Number(limit) : 10,
    };

    const resultado = despesaService.listarDespesas(filtros);
    return res.status(200).json(resultado);
  } catch (erro) {
    return next(erro);
  }
}

function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);
    const despesa = despesaService.buscarDespesaPorId(id);
    return res.status(200).json(despesa);
  } catch (erro) {
    return next(erro);
  }
}

function atualizar(req, res, next) {
  try {
    const id = Number(req.params.id);
    const despesa = despesaService.atualizarDespesaCompleta(id, req.body);
    return res.status(200).json(despesa);
  } catch (erro) {
    return next(erro);
  }
}

function atualizarParcial(req, res, next) {
  try {
    const id = Number(req.params.id);
    const despesa = despesaService.atualizarDespesaParcial(id, req.body);
    return res.status(200).json(despesa);
  } catch (erro) {
    return next(erro);
  }
}

function remover(req, res, next) {
  try {
    const id = Number(req.params.id);
    despesaService.removerDespesa(id);
    return res.status(204).send();
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { criar, listar, buscarPorId, atualizar, atualizarParcial, remover };
