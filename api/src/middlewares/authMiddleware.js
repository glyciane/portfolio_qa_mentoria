const authService = require("../services/authService");

/**
 * Middleware de autenticação.
 * Espera o header: Authorization: Bearer <token>
 * Se válido, anexa `req.usuarioId` para uso nos controllers.
 */
function autenticarToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensagem: "Token de autenticação ausente ou mal formatado" });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = authService.verificarToken(token);
    req.usuarioId = payload.sub;
    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }
}

module.exports = autenticarToken;
