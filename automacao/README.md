# Automação de Testes de API

Suíte de automação de testes de API, seguindo o mesmo padrão usado em
[`banco-api-tests`](https://github.com/glyciane/banco-api-tests): Mocha,
Chai e Supertest.

## Estrutura planejada

```
automacao/
├── fixtures/     # massas de dados usadas nos testes (payloads)
├── helpers/      # funções auxiliares (ex: obterToken, resetarBanco)
├── test/         # arquivos .test.js
├── package.json
└── .env          # BASE_URL (não versionado)
```

## Como executar

```bash
cd automacao
npm install
npm test
```

Relatório gerado via `mochawesome` (HTML) — ver pasta `relatorios/` na raiz
do projeto para a versão final consolidada.
