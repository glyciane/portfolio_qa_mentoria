/**
 * Middleware de tratamento de erros — centraliza a conversão de erros das
 * camadas de service em respostas HTTP padronizadas.
 */
function tratadorDeErros(erro, req, res, next) {
  if (erro.statusCode) {
    return res.status(erro.statusCode).json({ mensagem: erro.message });
  }

  console.error(erro); // eslint-disable-line no-console
  return res.status(500).json({ mensagem: "Erro interno do servidor" });
}

module.exports = tratadorDeErros;
