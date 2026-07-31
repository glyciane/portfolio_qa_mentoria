# 🧪 Portfólio de QA — Mentoria de Testes (Júlio de Lima)

Portfólio de testes de software desenvolvido como projeto final da mentoria
de testes do **Júlio de Lima**, aplicando na prática as etapas do ciclo de
testes sobre uma API real: planejamento, testes manuais, testes exploratórios,
automação de API, testes de performance e pipeline de CI/CD.

Este é um **monorepo**: o software testado (a API) e todo o material de QA
vivem juntos, no mesmo repositório.

> ⚠️ Os bugs encontrados foram **reportados, não corrigidos** — o objetivo
> deste portfólio é demonstrar o processo de teste, não o desenvolvimento
> da aplicação. Veja a aba [Issues](../../issues).

## 🎯 Sobre a API testada

Uma API REST de **controle de despesas pessoais**: registro de gastos,
categorias, formas de pagamento e relatório mensal por categoria. Construída
especificamente para este portfólio, em **Node.js + Express**, com:

- Arquitetura em camadas: `routes` → `controllers` → `services` → `models`
- Autenticação via **JWT**, implementada como middleware
- Banco de dados **em memória**
- Documentação **Swagger/OpenAPI** versionada como arquivo (`api/resources/swagger.yaml`), renderizada em `/docs`
- Regras de negócio propositais que geram cenários ricos de teste — e alguns bugs reais

Detalhes completos da API: [`api/README.md`](./api/README.md)

## 🎯 O que este repositório demonstra (QA)

- Planejamento de testes (plano de testes, cenários, casos de teste)
- Testes exploratórios com sessões documentadas (charters)
- Testes manuais com evidências
- Automação de testes de API (Mocha, Chai, Supertest)
- Testes de performance (k6)
- Pipeline de CI/CD (GitHub Actions)
- Relatórios de execução e de bugs

## 📁 Estrutura do repositório

```
portfolio_qa_mentoria/
├── api/                         # Software testado (Node.js + Express)
│   ├── src/                     # routes, controllers, services, models, middlewares
│   ├── resources/swagger.yaml   # documentação OpenAPI
│   ├── server.js
│   └── README.md
├── docs/                        # Planejamento e documentação de testes
│   ├── plano-de-testes.md
│   ├── cenarios-de-teste.md
│   ├── casos-de-teste.md
│   ├── status-codes-esperados.md
│   └── testes-exploratorios/    # Charters e notas das sessões exploratórias
├── manual/
│   └── evidencias/               # Prints e evidências da execução manual
├── automacao/                    # Suíte de automação (Mocha, Chai, Supertest)
├── performance/                  # Testes de performance (k6)
├── relatorios/                   # Relatórios finais de execução e de bugs
└── .github/workflows/            # Pipeline de CI/CD (GitHub Actions)
```

## 🚀 Como executar a API

```bash
cd api
npm install
cp .env.example .env
npm start
```

API em `http://localhost:3000` · Swagger em `http://localhost:3000/docs`

## 🐛 Bugs encontrados

Todos os bugs encontrados durante os testes estão documentados na aba
[Issues](../../issues) deste repositório, com passos de reprodução, resultado
esperado vs. obtido e evidências.

## 👩‍💻 Autora

**Glyciane Silva Santos**
🔗 [LinkedIn](#) *(adicionar link)*

---

*Projeto desenvolvido como conclusão da mentoria de testes de software do
Júlio de Lima. Sem uso de IA nas etapas de teste — apenas no apoio ao
desenvolvimento do software testado.*
