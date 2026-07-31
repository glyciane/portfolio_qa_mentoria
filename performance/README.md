# Testes de Performance

Testes de carga/performance usando [k6](https://k6.io/), focados nos
endpoints mais críticos: `GET /despesas` (listagem) e
`GET /relatorios/mensal` (agregação).

## Como executar

```bash
k6 run script.js
```

Resultados exportados para a pasta `relatorios/` na raiz do projeto.
