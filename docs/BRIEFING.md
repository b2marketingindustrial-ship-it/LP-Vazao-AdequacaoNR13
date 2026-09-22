# Briefing da LP — registro da entrevista

> Preenchido pelo agente durante a entrevista do PROMPT-PADRAO-LP (seção 0). Uma linha por entrada, atualizada assim que a resposta é confirmada. Se a sessão cair, o agente lê este arquivo e retoma da primeira entrada com status `pendente`.
>
> Status: `pendente` · `confirmado` · `default` (assumiu o valor padrão) · `pendência` (falta asset ou decisão do cliente) · `extraído` / `inferido` / `conflito` (vindos do documento de briefing, seção 0 do prompt)

## Origem: documento do cliente

| Campo                          | Valor                                                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Arquivo recebido               | `docs/briefing-cliente/briefing-colado.md` (organizado via PROMPT-BRIEFING-CLIENTE.md)                                                            |
| Tipo                           | A (estruturado nos 21 campos do padrão)                                                                                                            |
| Lido integralmente em          | 22/09/2026                                                                                                                                          |
| Referências visuais do cliente | logotipo Vazão (logo_vazao); 3 imagens de equipamento (instalacao_01, vaso_pressao_02, tubulacoes_03); 3 imagens citadas só por URL, sem arquivo   |
| Dados não aplicados por padrão | nenhum telefone/e-mail/rede social informado; URL de origem do material (vazao.com.br/portfolio/adequacao-nr13) não confirmada como URL_FINAL     |

### Mapa de aproveitamento (só Tipo A)

Esta LP é do tipo **serviço industrial** (item 3.1 do PROMPT-PADRAO-LP): seção 2 vira "Serviços", seção 3 vira "Como funciona", seção 4 vira "Onde atuamos".

| Bloco proposto no briefing | Veredito | Destino no blueprint | Motivo |
| --- | --- | --- | --- |
| "Levantamento de Campo" + checklist (válvula de segurança, indicação de pressão, placa de identificação, local de instalação) | cabe em | Seção 3 "Como funciona" (faixa de 6 etapas) — proposto como etapa 1 | Descreve um passo do processo de adequação, não um serviço autônomo. Faltam as demais etapas (laudo, projeto, execução, acompanhamento etc.) — nenhuma foi informada no material |
| Vasos de Pressão · Caldeiras · Tubulações e Sistemas de Tubulações · Tanques de Armazenamento | equivale | Seção 4 "Onde atuamos" (galeria de 4 itens, ex-Aplicações) | Já é uma lista de 4 categorias de equipamento enquadrado na NR13, mesmo formato da seção |
| Especialização em NR13 · Fundada em 1991 · Engenharia mecânica/civil/elétrica | equivale | Seção 6 Diferenciais (3 de 5 cards) | Mesma função — motivos para contratar a Vazão |
| "atender requisitos da NR13" + "segurança e saúde dos colaboradores" | cabe em | Frase de autoridade (seção 6, bloco navy) | Resume a dor/benefício central do serviço |
| "Somos comprometidos com a satisfação dos nossos clientes" | descartado | — | Institucional genérico, sem prova; não ajuda a converter |
| **Seção 2 "Serviços" (3–4 cards)** | **sem conteúdo do briefing** | — | Nenhum serviço distinto (ex.: Laudo Técnico, Projeto de Adequação, PMOC, Testes Hidrostáticos, Acompanhamento de Inspeção) foi descrito — só o processo de levantamento. Precisa ser perguntado na entrevista, sem inventar |
| **Segmentos atendidos (8)** | **sem conteúdo do briefing** | — | Nenhuma indústria/segmento de mercado foi informado. Precisa ser perguntado na entrevista |

### Seções extras aprovadas (máx. 2)

| id  | Posição (entre quais seções) | Esqueleto do GUIA-LAYOUT | data-cta |
| --- | ----------------------------- | ------------------------- | -------- |
|     | nenhuma seção extra proposta pelo briefing até o momento | | |

## Entradas da entrevista

| #   | Entrada                                            | Status    | Valor confirmado                                                                                          | Referência no briefing / observação |
| --- | --------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| 1   | MARCA                                              | extraído  | Vazão Engenharia e Montagem                                                                                  | "Fundada em 1991, a Vazão Engenharia e Montagem..." |
| 2   | MARCA_CURTA                                        | extraído  | Vazão                                                                                                         | logotipo "VAZÃO" |
| 3   | PRODUTO_PRINCIPAL                                  | inferido  | Serviços de Adequação NR13                                                                                   | resumido de "somos especialistas em Adequação NR13" |
| 4   | CONTEXTO_DE_USO                                    | inferido  | adequação e gestão da NR13 para equipamentos enquadrados na norma                                            | resumido do material |
| 5   | PUBLICO                                            | pendente  |                                                                                                                | ausente no briefing |
| 6   | MARCAS_REPRESENTADAS                               | pendente  |                                                                                                                | não aplicável (serviço, não revenda) — confirmar se o carrossel vira "clientes atendidos/certificações" ou é removido |
| 7   | LINHAS_DE_PRODUTO → "Serviços"                     | pendente  |                                                                                                                | sem conteúdo próprio no briefing (ver mapa acima); "Levantamento de Campo" foi realocado para "Como funciona" |
| 8   | DADOS_QUE_O_CLIENTE_PODE_ENVIAR → "Como funciona"  | pendente  |                                                                                                                | só a etapa 1 (Levantamento de Campo) tem base no briefing; faltam as demais 5 etapas |
| 9   | APLICACOES → "Onde atuamos"                        | inferido  | Vasos de Pressão · Caldeiras · Tubulações e Sistemas de Tubulações · Tanques de Armazenamento                | ver briefing-colado.md |
| 10  | SEGMENTOS                                          | pendente  |                                                                                                                | ausente no briefing — 8 obrigatórios |
| 11  | DIFERENCIAIS                                       | inferido  | 1) Especialização em NR13 · 2) Fundada em 1991 · 3) Engenharia mecânica, civil e elétrica · 4–5) ausentes    | faltam 2 itens |
| 12  | FRASE_DE_AUTORIDADE                                | inferido  | "Segurança e conformidade com a NR13."                                                                        | resumido do material |
| 13  | SELOS_DE_CONFIANCA                                 | inferido  | Especialistas em Adequação NR13 · Fundada em 1991 · Engenharia mecânica, civil e elétrica                     | resumido do material |
| 14  | ENDERECO                                           | extraído  | Av. Barão de Bonito, 880, Brasilit, Recife/PE, CEP 50.740-080                                                 | citado no material |
| 15  | URL_FINAL                                          | pendente  |                                                                                                                | só a URL de origem do material (não confirmada como final) |
| 16  | SHORTCODE_CHAT                                     | pendente  |                                                                                                                | técnico, perguntar na entrevista |
| 17  | SHORTCODE_FORM                                     | pendente  |                                                                                                                | técnico, perguntar na entrevista |
| 18  | WHATSAPP                                           | pendente  |                                                                                                                | ausente no briefing |
| 19  | STACK                                              | pendente  |                                                                                                                | detectar no template (Astro) |
| 20  | BRANCH_PRINCIPAL + PUBLICACAO                      | pendente  |                                                                                                                | detectar no template |
| 21  | TOKENS_DE_COR + FONTE                              | pendente  |                                                                                                                | logo tem azul/vermelho mas sem hex — confirmar se usa padrão da agência |

## Assets

| Asset                             | Arquivo esperado                                              | Status      | Observação |
| ---------------------------------- | ---------------------------------------------------------------- | ----------- | ---------- |
| Logo                               | `src/assets/LOGO.png` (240×200, fundo transparente)              | pendência   | logo_vazao citado no briefing, arquivo ainda não copiado para `src/assets/` |
| Banner do hero                     | `src/assets/heroBg.png` (1981×900, brief 4.1.3)                  | pendência   | nenhuma imagem do briefing atende ao brief do hero |
| Serviços (3–4)                     | `src/assets/products/*.png` (recorte 800×600) + `marcas.png`     | pendência   | seção "Serviços" ainda sem conteúdo definido |
| Onde atuamos / Aplicações (4)      | `src/assets/applications/*.png` (1200×900)                       | pendência   | 3 imagens citadas (instalacao_01, vaso_pressao_02, tubulacoes_03) + 1 ausente (Tanques de Armazenamento) |
| Segmentos (8)                      | `src/assets/segmentos/*.png` (1200×900)                          | pendência   | segmentos ainda não definidos |
| Logos de marcas / clientes (4–8)   | `src/assets/brands/*.webp` (400×160, fundo branco)                | pendência   | nenhum logo de cliente/certificação informado |
| Cenário do bloco de diferenciais   | `src/assets/cenario.jpg` (1600×900)                               | pendência   |            |
| Pessoa recortada                   | `src/assets/pessoa.png` (1220×1000, fundo transparente)          | pendência   |            |

## Aprovação

- [ ] Resumo da entrevista apresentado e aprovado pelo usuário em: `____/____/______`
- [ ] Padrão B2 versão: `1.0.0`
