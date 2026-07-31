const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const authRoutes = require("./routes/authRoutes");
const despesaRoutes = require("./routes/despesaRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const formaPagamentoRoutes = require("./routes/formaPagamentoRoutes");
const relatorioRoutes = require("./routes/relatorioRoutes");
const seedRoutes = require("./routes/seedRoutes");
const tratadorDeErros = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

// --- Documentação Swagger ---
// Arquivo versionado em resources/swagger.yaml, renderizado em /docs
const swaggerDocument = YAML.load(path.join(__dirname, "..", "resources", "swagger.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Rotas ---
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", mensagem: "Controle de Despesas API no ar" });
});

app.use(authRoutes);
app.use(despesaRoutes);
app.use(categoriaRoutes);
app.use(formaPagamentoRoutes);
app.use(relatorioRoutes);
app.use(seedRoutes);

// --- Tratamento de erros (deve ser o último middleware) ---
app.use(tratadorDeErros);

module.exports = app;
