# Briefing da LP — registro da entrevista

> Preenchido pelo agente durante a entrevista do PROMPT-PADRAO-LP (seção 0). Uma linha por entrada, atualizada assim que a resposta é confirmada. Se a sessão cair, o agente lê este arquivo e retoma da primeira entrada com status `pendente`.
>
> Status: `pendente` · `confirmado` · `default` (assumiu o valor padrão) · `pendência` (falta asset ou decisão do cliente) · `extraído` / `inferido` / `conflito` (vindos do documento de briefing, seção 0 do prompt)

## Origem: documento do cliente

| Campo                          | Valor                                                     |
| ------------------------------ | --------------------------------------------------------- |
| Arquivo recebido               | `docs/briefing-cliente/…` (ou "nenhum")                   |
| Tipo                           | A (estruturado) · B (conteúdo solto) · nenhum             |
| Lido integralmente em          | `____/____/______`                                        |
| Referências visuais do cliente | (listar; marcar "não aplicada" quando divergir do padrão) |
| Dados não aplicados por padrão | (telefone, e-mail, redes, CTAs próprios…)                 |

### Mapa de aproveitamento (só Tipo A)

| Bloco proposto no briefing | Veredito                                | Destino no blueprint | Motivo |
| -------------------------- | --------------------------------------- | -------------------- | ------ |
|                            | equivale · cabe em · extra · descartado |                      |        |

### Seções extras aprovadas (máx. 2)

| id  | Posição (entre quais seções) | Esqueleto do GUIA-LAYOUT | data-cta |
| --- | ---------------------------- | ------------------------ | -------- |
|     |                              |                          |          |

## Entradas da entrevista

| #   | Entrada                         | Status   | Valor confirmado | Referência no briefing / observação |
| --- | ------------------------------- | -------- | ---------------- | ----------------------------------- |
| 1   | MARCA                           | pendente |                  |                                     |
| 2   | MARCA_CURTA                     | pendente |                  |                                     |
| 3   | PRODUTO_PRINCIPAL               | pendente |                  |                                     |
| 4   | CONTEXTO_DE_USO                 | pendente |                  |                                     |
| 5   | PUBLICO                         | pendente |                  |                                     |
| 6   | MARCAS_REPRESENTADAS            | pendente |                  |                                     |
| 7   | LINHAS_DE_PRODUTO               | pendente |                  |                                     |
| 8   | DADOS_QUE_O_CLIENTE_PODE_ENVIAR | pendente |                  |                                     |
| 9   | APLICACOES                      | pendente |                  |                                     |
| 10  | SEGMENTOS                       | pendente |                  |                                     |
| 11  | DIFERENCIAIS                    | pendente |                  |                                     |
| 12  | FRASE_DE_AUTORIDADE             | pendente |                  |                                     |
| 13  | SELOS_DE_CONFIANCA              | pendente |                  |                                     |
| 14  | ENDERECO                        | pendente |                  |                                     |
| 15  | URL_FINAL                       | pendente |                  |                                     |
| 16  | SHORTCODE_CHAT                  | pendente |                  |                                     |
| 17  | SHORTCODE_FORM                  | pendente |                  |                                     |
| 18  | WHATSAPP                        | pendente |                  |                                     |
| 19  | STACK                           | pendente |                  |                                     |
| 20  | BRANCH_PRINCIPAL + PUBLICACAO   | pendente |                  |                                     |
| 21  | TOKENS_DE_COR + FONTE           | pendente |                  |                                     |

## Assets

| Asset                            | Arquivo esperado                                             | Status      | Observação |
| -------------------------------- | ------------------------------------------------------------ | ----------- | ---------- |
| Logo                             | `src/assets/LOGO.png` (240×200, fundo transparente)          | placeholder |            |
| Banner do hero                   | `src/assets/heroBg.png` (1981×900, brief 4.1.3)              | placeholder |            |
| Produtos (3–4)                   | `src/assets/products/*.png` (recorte 800×600) + `marcas.png` | placeholder |            |
| Aplicações (4)                   | `src/assets/applications/*.png` (1200×900)                   | placeholder |            |
| Segmentos (8)                    | `src/assets/segmentos/*.png` (1200×900)                      | placeholder |            |
| Logos de marcas (4–8)            | `src/assets/brands/*.webp` (400×160, fundo branco)           | placeholder |            |
| Cenário do bloco de diferenciais | `src/assets/cenario.jpg` (1600×900)                          | placeholder |            |
| Pessoa recortada                 | `src/assets/pessoa.png` (1220×1000, fundo transparente)      | placeholder |            |

## Aprovação

- [ ] Resumo da entrevista apresentado e aprovado pelo usuário em: `____/____/______`
- [ ] Padrão B2 versão: `1.0.0`
