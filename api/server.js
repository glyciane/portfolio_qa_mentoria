require("dotenv").config();

const app = require("./src/app");
const { seedData } = require("./src/seed/seedData");

const PORT = process.env.PORT || 3000;

// Popula o banco em memória com o dataset inicial assim que o servidor sobe
seedData();

app.listen(PORT, () => {
  console.log(`Controle de Despesas API rodando em http://localhost:${PORT}`);
  console.log(`Documentação Swagger em http://localhost:${PORT}/docs`);
});
