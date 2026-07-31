class ErroNaoEncontrado extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = "ErroNaoEncontrado";
    this.statusCode = 404;
  }
}

class ErroValidacao extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = "ErroValidacao";
    this.statusCode = 422;
  }
}

module.exports = { ErroNaoEncontrado, ErroValidacao };
