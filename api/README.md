# Controle de Despesas API

API REST para controle de despesas pessoais: registro de gastos, categorias,
formas de pagamento e relatório mensal por categoria. Desenvolvida como
software-alvo para o portfólio de testes da mentoria de QA do Júlio de Lima.

> Banco de dados **em memória**: os dados são reiniciados a cada execução da
> aplicação e populados automaticamente com um dataset fixo (seed).

## Tecnologias

- Node.js + Express
- JWT (`jsonwebtoken`) para autenticação
- Swagger / OpenAPI (`swagger-ui-express` + `yamljs`)
- Arquitetura em camadas: `routes` → `controllers` → `services` → `models`

## Estrutura do projeto

```
api/
├── resources/
│   └── swagger.yaml         # especificação OpenAPI (fonte da documentação)
├── src/
│   ├── routes/               # definição das rotas HTTP
│   ├── controllers/          # recebe a requisição, chama o service, formata a resposta
│   ├── services/              # regras de negócio e validações
│   ├── models/                 # "banco de dados" em memória (arrays)
│   ├── middlewares/           # autenticação JWT e tratamento de erros
│   ├── seed/                  # dataset fixo usado no /seed e na inicialização
│   └── app.js                 # montagem da aplicação Express
├── server.js                  # ponto de entrada
├── package.json
└── .env.example
```

## Como executar

```bash
cd api
npm install
cp .env.example .env
npm start        # ou: npm run dev (com nodemon)
```

A API sobe em `http://localhost:3000`.
Documentação Swagger: `http://localhost:3000/docs`.

## Usuário de teste (seed)

| Campo | Valor |
|---|---|
| email | glyciane@teste.com |
| senha | 123456 |

## Endpoints

| Verbo | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/login` | Não | Autentica e retorna token JWT |
| POST | `/despesas` | Sim | Cria uma despesa |
| GET | `/despesas` | Sim | Lista despesas (filtros: `mes`, `categoriaId`, `formaPagamentoId`; paginação `page`/`limit`) |
| GET | `/despesas/:id` | Sim | Retorna uma despesa |
| PUT | `/despesas/:id` | Sim | Atualiza despesa completa |
| PATCH | `/despesas/:id` | Sim | Atualiza despesa parcialmente |
| DELETE | `/despesas/:id` | Sim | Remove uma despesa |
| GET | `/categorias` | Sim | Lista categorias fixas |
| GET | `/formas-pagamento` | Sim | Lista formas de pagamento fixas |
| GET | `/relatorios/mensal?mes=YYYY-MM` | Sim | Total do mês + total por categoria |
| POST | `/seed` | Não | Reseta o banco para o estado inicial (uso em testes) |

Rotas autenticadas exigem o header: `Authorization: Bearer <token>`

## Regras de negócio (propositais, fonte de casos de teste)

- `valor` deve ser maior que zero
- `data` não pode ser futura
- `categoriaId` e `formaPagamentoId` devem existir (404 se não existirem)
- `PATCH` altera somente os campos enviados
- `/relatorios/mensal` sem despesas no mês retorna total zero e lista vazia
- Parâmetro `mes` fora do formato `YYYY-MM` retorna 422
