const relatorioService = require("../services/relatorioService");

function mensal(req, res, next) {
  try {
    const { mes } = req.query;
    const relatorio = relatorioService.relatorioMensal(mes);
    return res.status(200).json(relatorio);
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { mensal };
