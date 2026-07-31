const authService = require("../services/authService");

function login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(422).json({ mensagem: "Campos 'email' e 'senha' são obrigatórios" });
  }

  const token = authService.autenticar(email, senha);

  if (!token) {
    return res.status(401).json({ mensagem: "E-mail ou senha inválidos" });
  }

  return res.status(200).json({ token });
}

module.exports = { login };
