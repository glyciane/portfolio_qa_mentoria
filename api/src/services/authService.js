const jwt = require("jsonwebtoken");

const usuarioModel = require("../models/usuarioModel");

const JWT_SECRET = process.env.JWT_SECRET || "segredo-desenvolvimento-mentoria-qa";
const JWT_EXPIRES_IN = "1h";

function autenticar(email, senha) {
  const usuario = usuarioModel.buscarPorEmail(email);

  if (!usuario || usuario.senha !== senha) {
    return null;
  }

  const token = jwt.sign(
    { sub: usuario.id, email: usuario.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return token;
}

function verificarToken(token) {
  return jwt.verify(token, JWT_SECRET); // lança erro se inválido/expirado
}

module.exports = {
  autenticar,
  verificarToken,
  JWT_SECRET,
};
