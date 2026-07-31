const { seedData } = require("../seed/seedData");

function resetarEPopular(req, res) {
  seedData();
  return res.status(200).json({ mensagem: "Banco resetado e populado com dados iniciais" });
}

module.exports = { resetarEPopular };
