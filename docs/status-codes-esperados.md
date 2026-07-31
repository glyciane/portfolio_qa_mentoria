# Status Codes Esperados por Endpoint — Controle de Despesas API

Este documento serve de base para a criação dos cenários e casos de teste
(manuais, exploratórios e automatizados). Cada endpoint lista os cenários
esperados de sucesso e de erro, com o status code correspondente.

---

## POST /login

| Cenário | Status | Observação |
|---|---|---|
| Credenciais válidas | `200` | Retorna `token` |
| E-mail inexistente | `401` | |
| Senha incorreta | `401` | |
| Campo `email` ausente | `422` | Erro de validação |
| Campo `email` com formato inválido | `422` | Ex: `"email invalido"` |
| Campo `senha` ausente | `422` | |
| Body vazio `{}` | `422` | |

---

## POST /despesas

| Cenário | Status | Observação |
|---|---|---|
| Payload válido, todos os campos corretos | `201` | |
| Sem header `Authorization` | `401` | |
| Token inválido/expirado | `401` | |
| `valor` = 0 | `422` | Regra: valor deve ser > 0 |
| `valor` negativo | `422` | |
| `valor` como string (`"abc"`) | `422` | Erro de tipo |
| `descricao` vazia (`""`) | `422` | `min_length=1` |
| `descricao` ausente | `422` | |
| `data` no futuro | `422` | Regra de negócio |
| `data` em formato inválido (`"05/08/2026"`) | `422` | A API espera formato ISO `YYYY-MM-DD` |
| `data` ausente | `422` | |
| `categoriaId` inexistente | `404` | |
| `formaPagamentoId` inexistente | `404` | |
| `categoriaId` ausente | `422` | |
| `formaPagamentoId` ausente | `422` | |
| Campos extras não esperados no payload | `201` (a validar) | A API atual ignora campos extras silenciosamente — checar se é o comportamento desejado |

---

## GET /despesas

| Cenário | Status | Observação |
|---|---|---|
| Listagem padrão (sem filtros) | `200` | |
| Sem header `Authorization` | `401` | |
| Filtro `mes` válido (`2026-08`) | `200` | |
| Filtro `mes` formato inválido (`2026/08`, `13`, `agosto`) | `422` | |
| Filtro `categoriaId` válido | `200` | |
| Filtro `categoriaId` inexistente | `200` | Lista vazia, não erro |
| Filtro `formaPagamentoId` inexistente | `200` | Lista vazia |
| `page=0` ou negativo | `422` | `ge=1` |
| `limit=0` | `422` | `ge=1` |
| `limit` acima do máximo (101+) | `422` | `le=100` |
| `page` além do total de páginas | `200` | Lista vazia, `total` preenchido |
| Combinação de múltiplos filtros | `200` | |

---

## GET /despesas/{id}

| Cenário | Status | Observação |
|---|---|---|
| ID existente | `200` | |
| ID inexistente | `404` | |
| ID em formato inválido (ex: `"abc"`) | `404` | Comportamento real da API atual: `Number("abc")` vira `NaN`, não bate com nenhum registro e cai em "não encontrado". Vale discutir se `400`/`422` seria mais correto — bom candidato de bug/melhoria a documentar. |
| ID negativo ou zero | `404` | Não há validação explícita de negativo — mesmo comportamento acima |
| Sem header `Authorization` | `401` | |
| Despesa de outro usuário (se multiusuário for testado) | `200` ou `404`* | *Atenção: API atual não filtra despesa por usuário — bug em potencial |

---

## PUT /despesas/{id}

| Cenário | Status | Observação |
|---|---|---|
| Atualização completa válida | `200` | |
| ID inexistente | `404` | |
| Payload sem todos os campos obrigatórios | `422` | PUT exige o objeto completo |
| `valor` inválido (0/negativo) | `422` | |
| `data` futura | `422` | |
| `categoriaId`/`formaPagamentoId` inexistente | `404` | |
| Sem header `Authorization` | `401` | |

---

## PATCH /despesas/{id}

| Cenário | Status | Observação |
|---|---|---|
| Atualização parcial de 1 campo | `200` | Demais campos devem permanecer intactos — validar |
| Atualização de múltiplos campos | `200` | |
| Body vazio `{}` | `200` | Nenhuma alteração — validar se é o esperado |
| ID inexistente | `404` | |
| `categoriaId` inexistente enviado no patch | `404` | |
| `valor` inválido enviado no patch | `422` | |
| `data` futura enviada no patch | `422` | |
| Sem header `Authorization` | `401` | |

---

## DELETE /despesas/{id}

| Cenário | Status | Observação |
|---|---|---|
| ID existente | `204` | Sem corpo de resposta |
| ID inexistente | `404` | |
| Deletar o mesmo ID duas vezes seguidas | `404` na 2ª chamada | |
| Sem header `Authorization` | `401` | |
| Verificar via GET que o item some após o DELETE | `404` no GET seguinte | Teste de integração entre endpoints |

---

## GET /categorias

| Cenário | Status | Observação |
|---|---|---|
| Listagem padrão | `200` | Sempre retorna as 5 categorias fixas |
| Sem header `Authorization` | `401` | |

---

## GET /formas-pagamento

| Cenário | Status | Observação |
|---|---|---|
| Listagem padrão | `200` | Sempre retorna as 4 formas fixas |
| Sem header `Authorization` | `401` | |

---

## GET /relatorios/mensal

| Cenário | Status | Observação |
|---|---|---|
| `mes` válido com despesas no período | `200` | `total_gasto` e `por_categoria` corretos |
| `mes` válido sem nenhuma despesa | `200` | `total_gasto: 0`, `por_categoria: []` |
| `mes` ausente | `422` | Parâmetro obrigatório |
| `mes` formato inválido (`2026/08`, `08-2026`, `13`) | `422` | |
| `mes` com mês fora do intervalo (`2026-13`) | `422` | |
| Mês na virada de ano (`dezembro → janeiro`) | `200` | Testar especificamente `mes=2026-12` |
| Sem header `Authorization` | `401` | |
| Soma de `por_categoria` bate com `total_gasto` | `200` | Validação de consistência entre os dois valores |

---

## POST /seed

| Cenário | Status | Observação |
|---|---|---|
| Chamada padrão | `200` | Reseta e repopula o banco |
| Chamadas consecutivas (idempotência) | `200` em todas | Resultado final deve ser sempre o mesmo dataset |
| Chamada sem token | `200` | Endpoint de apoio, não exige autenticação — confirmar se é intencional |

---

## Observações gerais para os casos de teste

1. **Consistência de erro 401 vs 422**: em endpoints protegidos, definir a ordem de validação — se o token é checado antes ou depois da validação do payload. Isso pode gerar comportamento inconsistente entre endpoints (bug em potencial).
2. **Isolamento entre usuários**: como a API atual não filtra despesas por `usuario_id` nas consultas, qualquer usuário autenticado enxerga todas as despesas — vale um teste específico e, se confirmado, um bug a ser reportado (mencionado acima em `GET /despesas/{id}`).
3. **Precisão de ponto flutuante em `valor`**: testar somas com muitas casas decimais (ex: `10.10 + 10.20`) no relatório mensal — clássica fonte de bugs de arredondamento.
4. **Volume de dados**: comportamento de `GET /despesas` e do relatório com uma quantidade grande de registros (relevante também para os testes de performance).
