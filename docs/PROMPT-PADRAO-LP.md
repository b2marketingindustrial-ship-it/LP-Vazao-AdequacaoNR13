# PROMPT PADRÃO — Landing Page B2 Marketing Industrial

> Como usar: copie tudo abaixo da linha e cole como primeira mensagem para o agente (Claude Code, Codex, etc.) no repositório da nova LP. Não preencha nada antes: o agente vai te entrevistar ponto a ponto (seção 0.2) e só começa a construir depois que você aprovar o resumo.
> **Tem briefing do cliente?** Cole o texto na mesma mensagem, anexe o arquivo (.docx, .pdf, .md, .txt) ou salve em `docs/briefing-cliente/` e diga o caminho. O agente lê tudo antes da primeira pergunta (seção 0) e só pergunta o que o documento não responde. O padrão deste prompt prevalece sobre qualquer estrutura sugerida no briefing.
> Derivado da LP Pioneira Rolamentos (Astro 7 + Tailwind 4). Vale para Astro, Next (static export) ou HTML puro.
> **Versão do padrão: 1.0.0** (changelog em `PROJETOS/LP-STARTER-B2/template/CHANGELOG.md`). O repositório-template `PROJETOS/LP-STARTER-B2/template` já contém toda a estrutura descrita aqui; comece sempre por uma cópia dele (`node scripts/new-lp.mjs <Cliente> <Produto>` na pasta do starter). Neste caso o trabalho do agente é preencher `src/data/site.ts`, `src/data/content.ts` e `src/assets/`, nunca reescrever componentes.

---

Você é o desenvolvedor front-end responsável por construir (ou refatorar) uma landing page B2B industrial de **uma única página**, seguindo rigorosamente o padrão de processo, estrutura e design abaixo. O objetivo da página é gerar cotações/leads via atendimento (chat, formulário e WhatsApp) integrados por plugin WordPress. Não invente seções, tokens ou padrões novos sem necessidade: reaproveite os descritos aqui.

## 0. Briefing do cliente (opcional, antes da entrevista)

O usuário pode entregar um documento de briefing junto com este prompt. Ele vem de duas formas:

- **Tipo A — briefing estruturado:** já sugere seções, ordem, títulos, às vezes wireframe ou referências de layout.
- **Tipo B — conteúdo solto:** só informações (empresa, produtos, marcas, diferenciais, segmentos, contatos), sem direcionamento de estrutura.

Em ambos os casos vale a mesma hierarquia: **o padrão deste prompt manda; o briefing abastece.** Nada do briefing altera Header, Hero, Cotação, Footer, tokens, vocabulário de CTA ou quantidades do padrão. O que não cabe é descartado com motivo registrado, nunca encaixado à força.

### 0.1 Protocolo de leitura

1. **Leia o documento inteiro antes de qualquer pergunta.** Se for `.docx` ou `.pdf`, extraia o texto completo (use as ferramentas disponíveis; não resuma antes de ler tudo). Guarde o original em `docs/briefing-cliente/` com o nome do arquivo recebido; se veio colado, salve como `docs/briefing-cliente/briefing-colado.md`.
2. **Classifique** como Tipo A ou B e diga isso em uma linha ao usuário.
3. **Monte a tabela de extração** das 21 entradas (mesma ordem da entrevista). Para cada entrada:

| Status | Significado | O que acontece na entrevista |
|---|---|---|
| `extraído` | o documento responde de forma direta e inequívoca (ex.: endereço, marcas listadas, nome da empresa) | não é perguntado; entra no resumo final para aprovação em bloco |
| `inferido` | você deduziu ou adaptou (ex.: cortou 12 segmentos para 7; transformou parágrafo em 3 features; escolheu ícone) | é perguntado, com a sua versão como opção 1 e "ajustar" como opção 2 |
| `ausente` | o documento não fala | é perguntado normalmente, com defaults |
| `conflito` | o documento contraria o padrão (ex.: pede 6 linhas de produto, pede formulário próprio, pede botão vermelho) | é perguntado mostrando o padrão como opção 1 e explicando em uma linha por que a versão do briefing não entra |

   Cada valor `extraído`/`inferido` traz a **referência** (página, título ou trecho curto entre aspas) para o usuário conferir.

4. **Se for Tipo A, monte também o mapa de aproveitamento de estrutura.** Para cada seção ou bloco que o briefing propõe:

| Veredito | Critério | Exemplo |
|---|---|---|
| `equivale` | é a mesma coisa que uma seção do blueprint com outro nome | "Nossos produtos" → seção 2 Linhas de produto |
| `cabe em` | o conteúdo vira parte de uma seção existente (card, bullet, item da faixa, selo) | "Certificações ISO" → selo de confiança na Cotação ou bullet em Diferenciais |
| `extra` | conteúdo relevante para conversão que não tem casa em nenhuma seção, e o briefing tem material para preencher | "Etapas do atendimento" → seção nova com esqueleto de faixa de itens do `docs/GUIA-LAYOUT.md` |
| `descartado` | quebra o padrão ou não ajuda a converter | menu de navegação, blog, depoimentos sem foto/nome, seção "Sobre nós" longa, vídeo institucional no hero |

   Regras para `extra`: no máximo **2** seções extras por LP; entram entre a seção 3 e a 6 (nunca antes do painel de apoio, nunca depois dos Diferenciais); seguem o item 4.2 e o `GUIA-LAYOUT.md`; recebem `id` em português, `data-cta` próprio e entram no `check:lp` como qualquer seção. Se o briefing propõe mais de 2 extras, ranqueie por impacto em conversão e pergunte quais ficam.

   Ordem, títulos de seção e wireframes do briefing **não** são seguidos; apenas o conteúdo é reaproveitado. Se o briefing traz referências visuais (prints, links), registre-as no `BRIEFING.md` como "referência do cliente, não aplicada" a menos que coincidam com o padrão.

5. **Apresente ao usuário, em uma única mensagem**, antes de começar a entrevista:
   - a classificação (A/B) e o arquivo salvo;
   - a tabela de extração resumida (entrada · status · valor · referência);
   - se Tipo A, o mapa de aproveitamento (bloco do briefing · veredito · destino);
   - a lista de conflitos com o padrão, cada um com a decisão proposta;
   - a pergunta: "Posso seguir com esse mapa?" com as opções (1) sim, ir para as perguntas que faltam, (2) quero ajustar o mapa.
6. **Grave tudo em `docs/BRIEFING.md`** (seção "Origem: documento do cliente" + tabela de extração + mapa de aproveitamento) antes de fazer a primeira pergunta. Preencha as linhas das 21 entradas com o status correspondente.
7. **Entrevista reduzida:** pergunte só `inferido`, `ausente` e `conflito`, uma por vez, no modelo do item 0.2. As `extraído` aparecem juntas no resumo final para aprovação em bloco, com a opção "ajustar a entrada N".

### 0.1.1 Regras de adaptação de conteúdo

- **Não invente fatos.** Marca, número, certificação, prazo, cidade, cliente atendido: só se estiver no briefing ou for confirmado pelo usuário.
- **Preserve o vocabulário técnico do cliente** (nomes de produto, normas, siglas). Reescreva só forma e tamanho para caber nas regras de copy do item 8.
- **Excesso vira seleção, não invenção.** 12 segmentos no briefing → proponha os 7 mais relevantes para o produto, o 8º fixo "Outras aplicações", e ofereça a lista completa para o usuário trocar. Os excedentes podem virar bullets do segmento mais próximo.
- **Falta vira pergunta, não preenchimento.** 2 diferenciais no briefing → pergunte os outros 3 mostrando os do padrão como sugestão; não complete sozinho.
- **Texto longo vira hierarquia.** Um parágrafo de 6 linhas sobre um produto vira: título (nome) · descrição (1 frase, 50–90 caracteres) · 3 features (2–4 palavras) . O resto do parágrafo é descartado ou vai para o painel de detalhe de segmento.
- **CTA do briefing é ignorado.** "Peça um orçamento", "Entre em contato", "Saiba mais" viram o vocabulário fixo do item 8.
- **Imagens citadas no briefing** viram linhas na tabela de assets com status `pendência` até o arquivo existir em `src/assets/`.
- **Dados de contato** (telefone, e-mail, redes) não entram na página: só endereço no footer e WhatsApp no botão flutuante, se informado. Registre os demais no `BRIEFING.md` como "não aplicado (padrão)".

## 0.2 Entrevista de entradas (obrigatória antes de qualquer código)

Você **não tem** as informações do cliente. Colete-as perguntando **uma entrada por vez**, na ordem da tabela abaixo, e **espere a resposta** antes de passar para a próxima.

### Como perguntar

Se o seu ambiente tiver uma ferramenta de pergunta com opções clicáveis (ex.: `AskUserQuestion` no Claude Code), **use-a** com as mesmas opções abaixo. Se não tiver, escreva a pergunta em texto seguindo exatamente este modelo:

```
**{{n}}/21 · {{Título curto em linguagem simples}}**
{{Uma frase de pergunta, no máximo 15 palavras.}}

1. {{Opção recomendada}}  ← recomendado
2. {{Opção alternativa}}
3. Outro (digite o valor)

Responda com o número ou digite direto.
```

Regras do modelo:

1. **Linguagem de cliente, não de código.** Nunca mostre nome de variável, arquivo, tag ou classe (`site.brand`, `og:site_name`, `WhyPioneira`, `alt`). Diga "nome da empresa", "título da aba do navegador", "rodapé".
2. **No máximo 3 linhas antes das opções**: título, pergunta e, se precisar, uma linha de contexto. Nada de "Alimenta / Formato / Exemplo / Detectado / Default" em blocos separados.
3. **Sempre 2 a 4 opções numeradas.** A primeira é a recomendada (o valor detectado no repositório, ou o default, ou o exemplo da Pioneira). A última é sempre "Outro (digite o valor)".
4. **O que você detectou no repositório vira a opção 1**, com a marcação "(encontrado no projeto)". Não explique onde encontrou.
5. **Resposta numérica basta.** "1" fecha a entrada. Texto livre é aceito como "Outro".
6. **Confirme em uma linha e já emende a próxima pergunta** na mesma mensagem: `✅ Nome da empresa: Pioneira Rolamentos` seguido do bloco da pergunta seguinte. Não gaste uma mensagem só para confirmar.
7. **Entradas em lista** (linhas de produto, aplicações, segmentos, diferenciais, dados enviáveis, selos): primeiro pergunte "Quer partir da lista de exemplo e ajustar, ou montar do zero?" com as opções (1) usar exemplo e ajustar, (2) montar do zero. Depois peça **um item por mensagem**, mostrando o item de exemplo já preenchido como opção 1 e "Outro (digite: título | descrição | feature, feature, feature | foto)" como opção 2.
8. Se a resposta vier incompleta, peça só o que falta, em uma linha. Não invente itens para completar a cota.
9. Se a resposta violar uma regra de copy do item 8 (frase longa, quantidade errada, CTA fora do vocabulário), mostre a versão ajustada como opção 1 e a original como opção 2.
10. Antes de perguntar sobre imagens, olhe `src/assets/` (ou `public/`) e ofereça os arquivos encontrados como opções numeradas.
11. Antes de perguntar stack, branch e publicação, inspecione `package.json`, `git branch` e os workflows, e ofereça o detectado como opção 1.
12. Ao terminar as 21 entradas, mostre um **resumo em tabela** (entrada → valor) e pergunte: "Posso começar com esses valores?" com as opções (1) sim, começar, (2) quero ajustar algo. Só comece após a opção 1.
13. Durante a construção, qualquer decisão não coberta pela entrevista vira uma pergunta no mesmo modelo. Nunca avance com suposição em nada que apareça na tela.
14. **Persistência.** Antes da primeira pergunta, leia `docs/BRIEFING.md` e `docs/briefing-cliente/` (se existir, aplique a seção 0 primeiro). Se o `BRIEFING.md` tiver entradas com status `confirmado`/`default`/`extraído`, não pergunte de novo: mostre em uma linha o que já está registrado e retome da primeira entrada `pendente`, `inferido` ou `conflito`. A cada resposta confirmada, atualize a linha correspondente da tabela (status, valor, observação) **antes** de fazer a próxima pergunta. Assets faltantes entram na tabela de assets como `pendência`. No final, marque a aprovação com a data.

Exemplo do modelo aplicado à entrada 1:

```
**1/21 · Nome da empresa**
Como a empresa deve aparecer no título do site e no rodapé?

1. Pioneira Rolamentos (encontrado no projeto)  ← recomendado
2. Outro (digite o valor)

Responda com o número ou digite direto.
```

Exemplo para uma entrada em lista (item 2 de 4 da lista de linhas de produto):

```
✅ Linha 1: Rolamentos de Esferas

**7/21 · Linhas de produto — item 2 de 4**
Qual é a segunda linha de produto?

1. Rolamentos de Rolos · "Indicados para cargas elevadas e condições severas." · Altas cargas, Maior robustez, Aplicações severas · rolos.png  ← exemplo
2. Outro (digite: título | descrição | feature, feature, feature | foto)

Responda com o número ou digite direto.
```

Ordem e conteúdo das perguntas (uso interno seu; a coluna "Alimenta" **não** aparece para o usuário):

| # | Entrada (interno) | Título para o usuário | Pergunta (≤ 15 palavras) | Alimenta (interno) | Opções sugeridas | Exemplo (Pioneira) |
|---|---|---|---|---|---|---|
| 1 | MARCA | Nome da empresa | Como a empresa deve aparecer no título do site e no rodapé? | `site.brand`, `og:site_name`, title, footer | (1) detectado no projeto · (2) Outro | Pioneira Rolamentos |
| 2 | MARCA_CURTA | Nome curto | Como chamamos a empresa em frases como "Por que a …"? | eyebrows, alt texts, nome de componente | (1) primeira palavra do nome · (2) Outro | Pioneira |
| 3 | PRODUTO_PRINCIPAL | Produto principal | Qual produto esta página vende? (no plural) | H1, tagline do header, title | (1) detectado no projeto/README · (2) Outro | Rolamentos industriais |
| 4 | CONTEXTO_DE_USO | Para quê / para quem | Em que situação o cliente compra esse produto? | H1, title, description | (1) manutenção e reposição · (2) projetos e obras · (3) Outro | manutenção e reposição |
| 5 | PUBLICO | Quem decide a compra | Quais cargos costumam pedir cotação? | copy de diferenciais e cotação | (1) Manutenção, PCM, Engenharia, Compras · (2) Outro | idem |
| 6 | MARCAS_REPRESENTADAS | Marcas que vocês vendem | Quais marcas devem aparecer no texto e no carrossel de logos? | H1/description, chip do hero, card escuro, carrossel | (1) logos encontradas na pasta de marcas · (2) Outro | SKF, FAG, NSK, Timken |
| 7 | LINHAS_DE_PRODUTO | Linhas de produto (3–4) | Quantas linhas de produto vamos mostrar? Depois, um item por vez. | seção 2 (cards) | (1) 4 · (2) 3 · depois por item: (1) exemplo · (2) Outro | Rolamentos de Esferas · "Para motores, bombas e equipamentos de alta rotação." · Alta rotação, Baixo atrito, Diversas aplicações · esferas.png |
| 8 | DADOS_QUE_O_CLIENTE_PODE_ENVIAR | O que o cliente pode enviar (6) | Que informações o cliente pode mandar para vocês identificarem o produto? | seção 3 (faixa de 6 itens) | (1) Referência, Marca, Foto, Medidas, Equipamento, Aplicação · (2) ajustar a lista · (3) Outro | Referência · "ou código gravado" · barcode |
| 9 | APLICACOES | Aplicações (4) | Em que equipamentos o produto é usado? Um item por vez. | seção 4 (galeria) | por item: (1) exemplo · (2) Outro | Motores Elétricos · "Rolamentos para aplicações em motores e conjuntos rotativos." · motores.png |
| 10 | SEGMENTOS | Segmentos atendidos (7 + Outras) | Quais indústrias vocês atendem? Um item por vez. | seção 5 (tabs) | (1) usar os 7 da Pioneira e ajustar · (2) montar do zero; 8º fixo "Outras Aplicações Industriais" | Mineração · "Rolamentos robustos para cargas elevadas…" · Britadores e peneiras, Transportadores de correia, Moinhos e bombas de polpa · mineracao.png · mountain |
| 11 | DIFERENCIAIS | Diferenciais (5) | Por que o cliente deve comprar de vocês? Um item por vez. | seção 6 (5 cards) | (1) usar os 5 da Pioneira e ajustar · (2) montar do zero | search · Apoio na identificação · "Encontre o rolamento certo com apoio técnico." |
| 12 | FRASE_DE_AUTORIDADE | Frase de impacto | Qual frase curta resume a dor do cliente? (3–6 palavras) | H2 do bloco navy da seção 6 | (1) "Seu equipamento não pode parar." · (2) "Sua produção não pode esperar." · (3) Outro | "Seu equipamento não pode parar." |
| 13 | SELOS_DE_CONFIANCA | Selos de confiança (3) | Que três garantias aparecem ao lado do formulário? | seção 7 (3 itens) | (1) Resposta rápida, Apoio técnico especializado, Atendimento em todo o Brasil · (2) Outro | clock · Resposta rápida |
| 14 | ENDERECO | Endereço | Qual endereço vai no rodapé? | footer | (1) detectado no projeto · (2) Outro | Rua Barão de Parnaíba, 191 - Centro, Campinas - SP, 13013-170 |
| 15 | URL_FINAL | Endereço da página no ar | Qual será o link final da página? (com https) | `site.url`, `og:url` | (1) detectado em config/README · (2) Outro | https://cliente.com.br/lp/rolamentos |
| 16 | SHORTCODE_CHAT | Chat do topo | Qual shortcode do chat vai no topo da página? | slot do hero | (1) `[atendimento_chat id="default"]` · (2) Outro | idem |
| 17 | SHORTCODE_FORM | Formulário de cotação | Qual shortcode do formulário vai no fim da página? | slot da cotação | (1) `[atendimento_form id="default-form"]` · (2) Outro | idem |
| 18 | WHATSAPP | WhatsApp flutuante | Vai ter botão de WhatsApp fixo na tela? | botão flutuante | (1) Não · (2) Sim (digite o número com DDI e DDD) | 5519999999999 |
| 19 | STACK | Tecnologia | Em que tecnologia vamos construir? | arquitetura (item 3) | (1) detectada no projeto · (2) Astro · (3) Next · (4) HTML puro | astro |
| 20 | BRANCH_PRINCIPAL + PUBLICACAO | Publicação | Como a página vai para o ar? | workflow | (1) detectado: branch X + wp-build · (2) Vercel · (3) Outro | master + wp-build |
| 21 | TOKENS_DE_COR + FONTE | Cores e fonte | Usamos o visual padrão (azul-marinho, laranja, Manrope)? | `@theme` | (1) Sim, padrão · (2) Cores do cliente (digite os hex) · (3) Fonte diferente (digite) | padrão |

Assets: para as entradas 7, 9, 10 e para hero, logo e foto de pessoa, pergunte o caminho do arquivo. Se o arquivo não existir, registre como pendência e use um placeholder com o mesmo `aspect-ratio`, sem inventar imagem.

Banner do hero: ao perguntar pelo arquivo, verifique se ele segue o brief do item 4.1.3 (1981×900, assunto entre 62% e 79% da largura, lado esquerdo escuro). Se não seguir, ofereça as opções (1) usar assim mesmo e validar na tela, (2) registrar pendência e entregar o brief 4.1.3 pronto para o designer. Nunca reposicione o grid para caber na imagem.

## 1. Regras invioláveis

1. **Uma rota, uma página.** Sem navegação interna por menu; o Header tem logo, tagline e um CTA.
2. **Página é composição, seções são autocontidas.** O arquivo de página só importa e empilha seções. Cada seção contém: dados no topo (array tipado `as const`), markup, estilo escopado, script próprio. Nada de copy no arquivo de página.
3. **Todo CTA é um `<button type="button">` com a classe `btn-slave-whats`.** Nunca `href`, nunca `onClick` próprio. O plugin de atendimento do WordPress captura o clique.
4. **Dois slots de shortcode**: um no Hero (coluna de 300px, chat) e um na seção final (formulário). Cada slot tem placeholder tracejado como fallback quando vazio.
5. **Nenhuma dobra sem CTA.** Cada seção termina em botão ou em cards clicáveis.
6. **Uma família tipográfica.** Hierarquia por peso (extrabold / semibold / medium / regular) e tracking, nunca por trocar fonte.
7. **Toda animação tem guarda `prefers-reduced-motion`.**
8. **Imagens só via pipeline otimizado** (astro:assets / next-image-export / script sharp): WebP/AVIF, `width` explícito, `loading="lazy"` exceto o LCP.
9. **Sem biblioteca de ícones.** Sprite SVG inline próprio (24×24, stroke 1.6, `currentColor`). Ícone novo = entrada nova no mapa.
10. **Sem framework JS no cliente** para interação. Vanilla TS em `<script>` de componente, raiz por `data-*`, `querySelectorAll().forEach` para múltiplas instâncias.
11. **Prettier + ESLint** obrigatórios: `semi: false`, `singleQuote`, `printWidth: 100`, `trailingComma: all`, plugin tailwind ordenando classes. `npm run lint`, `format:check` e `build` devem passar antes de entregar.
12. **Nunca deixar componente morto.** Se substituiu uma seção, apague a anterior. Se um utility CSS não é usado, remova.
13. **Header, Hero, Cotação e Footer são estrutura base fixa** (item 4.1). Copie grid, medidas, camadas e ordem sem alterar. A coluna 2 do Hero fica vazia de propósito: é a janela do banner. O banner é produzido para esse grid (brief em 4.1.3); se a imagem não encaixar, ajusta-se a imagem, nunca o grid.

## 2. Design tokens (default; substituir apenas se `TOKENS_DE_COR` foi informado)

Declare no `@theme` do CSS global (Tailwind 4):

```css
--color-primary-dark: #002147;      /* navy base */
--color-primary-dark-800: #003669;  /* navy claro: gradientes e hover */
--color-primary-dark-900: #001830;  /* navy profundo: header, hero, véus */
--color-accent-orange: #ff6b00;     /* CTA, marcadores, barras, foco */
--color-accent-orange-dark: #e55f00;
--color-neutral-light: #ffffff;
--color-neutral-gray-100: #f5f7fa;  /* fundo alternado e chips */
--color-neutral-gray-200: #a0a0a0;  /* bordas, sempre com /60–/70 */
--color-ink: #1b2733;               /* texto principal */
--color-ink-soft: #44546a;          /* texto secundário */
--container-page: 1320px;           /* max-w-page */
--font-display: 'Manrope', ui-sans-serif, system-ui, sans-serif;
--font-sans: 'Manrope', ui-sans-serif, system-ui, sans-serif;
```

Base obrigatória: `scroll-behavior: smooth`; `::selection` laranja com texto branco; `*:focus-visible { outline: 2px solid accent; offset 2px }`; `body` com `bg-neutral-light font-sans text-ink antialiased`.

Utilities obrigatórias: `navy-premium` (bg navy + `radial-gradient` de brilho + `linear-gradient 165deg` 800→base→900) e uma malha blueprint (`linear-gradient` 1px a cada 34–44px, `rgb(255 255 255 / .05)`, com `mask-image: radial-gradient` esmaecendo nas bordas).

Semântica de cor: **laranja = ação e marcação** (botão, quadrado do eyebrow, traço sob título, barra de hover, check dos bullets, cantos técnicos). **Navy = respiro e autoridade** (hero, um painel no meio, um bloco antes do form, footer). **Cinza-100 = alternância** de fundo. Nunca usar laranja como fundo de seção.

## 3. Arquitetura de arquivos

Com o template (`PROJETOS/LP-STARTER-B2/template`) esta arquitetura já existe. Os únicos arquivos que a entrevista altera são `src/data/site.ts`, `src/data/content.ts`, `src/assets/**` e, se a entrada 21 trouxer cores/fonte, o bloco `@theme` de `src/styles/global.css`. Componentes só mudam quando o mapa de seções (3.1) mandar trocar uma seção, e ainda assim Header, Hero, Cotação e Footer ficam intactos. A tabela abaixo serve para quando o template não puder ser usado (stack diferente).

| Papel | Astro (default) | Next (static export) | HTML puro |
|---|---|---|---|
| Página (composição) | `src/pages/index.astro` | `src/app/page.js` | `index.html` |
| Head / SEO / preload | `src/layouts/Layout.astro` | `src/app/layout.js` + `metadata` | `<head>` do index |
| Dados globais | `src/data/site.ts` | `src/data/site.js` | `<script type="application/json">` ou constante |
| Tokens | `src/styles/global.css` (`@theme`) | `src/app/globals.css` (`@theme`) | `styles.css` com `@theme` via CLI Tailwind |
| Seções | `src/components/<Nome>.astro` | `src/app/components/<Nome>.jsx` | blocos `<section>` comentados |
| Primitivos | `Button`, `Eyebrow`, `Icon`, `BrandCarousel` | idem em `.jsx` | classes utilitárias `.btn`, `.eyebrow`, `<svg><use>` |
| Assets | `src/assets/{brands,products,applications,segmentos}/` | `public/` + script sharp, mesma divisão | `assets/img/…` |
| Publicação | `.github/workflows/build-wp.yml` → branch `wp-build` | `output: 'export'` + `basePath` + mesmo workflow apontando `out/` | `build-wp.py` |

Nomes de seção em PascalCase e em inglês (`Hero`, `ProductLines`, `SupportPanel`, `ApplicationsGallery`, `SegmentsShowcase`, `WhyBrand`, `QuoteForm`, `Footer`). `id`s HTML em português sem acento (`linhas`, `identificar`, `aplicacoes`, `segmentos`, `diferenciais`, `cotacao`).

## 3.1 Mapa de seções por tipo de LP

O blueprint do item 4 nasceu de uma LP de **produto físico com identificação por referência**. Quando o negócio for diferente, use esta tabela para decidir o que fica, o que sai e o que substitui. Pergunte o tipo na entrevista (entrada 3/4) e aplique sem inventar seções novas.

| Seção | Produto físico (peças, componentes) | Equipamento / máquina | Serviço industrial (instalação, manutenção, obra) |
|---|---|---|---|
| Header, Hero, Cotação, Footer | fixos | fixos | fixos |
| 2 · Linhas de produto | obrigatória | obrigatória (modelos/linhas) | vira **"Serviços"**: 3–4 cards com o mesmo layout, foto do serviço no lugar do produto recortado, card escuro = "Contratos / Atendimento recorrente" |
| 3 · Painel de apoio (identificação) | obrigatória | obrigatória ("Precisa dimensionar?" com dados: vazão, pressão, potência…) | vira **"Como funciona"**: mesma faixa de 6 itens, mas etapas (Diagnóstico → Proposta → Execução → …) |
| 4 · Aplicações | obrigatória | obrigatória | vira **"Onde atuamos"** (tipos de obra/planta) ou sai, se Segmentos já cobrir |
| 5 · Segmentos | obrigatória (8) | obrigatória (8) | obrigatória (8) |
| 6 · Diferenciais | obrigatória (5) | obrigatória (5) | obrigatória (5), pessoa = técnico/equipe em campo |
| Carrossel de marcas | obrigatório | obrigatório (marcas representadas) | opcional: vira logos de **clientes atendidos** ou certificações; se não houver 4+, remover o carrossel e deixar o cabeçalho da seção 2 em largura total |
| CTA secundário do hero | "Identifique seu {{produto}}" | "Dimensione seu {{equipamento}}" | "Agende uma visita técnica" |

Regra: trocar o **conteúdo e o nome** de uma seção, nunca o layout. Uma LP de serviço usa exatamente os mesmos componentes com outro `content.ts`.

## 4. Blueprint da página (ordem fixa)

| # | Seção | Fundo | Padding | Layout desktop | Conteúdo | CTA |
|---|---|---|---|---|---|---|
| 0 | **Header** — **ESTRUTURA FIXA, ver 4.1.1** | `primary-dark-900` sticky `z-50` | `py-3` | logo em placa branca pendurada · tagline uppercase centrada · botão | logo, `PRODUTO_PRINCIPAL` | "Solicite sua cotação" (mobile: "Cotação") |
| 1 | **Hero** — **ESTRUTURA FIXA, ver 4.1.2 e banner em 4.1.3** | navy-900 + banner ancorado à direita do container + véus navy | `py-20 lg:py-24` | grid `minmax(0,1fr) 270px 300px`: texto · **coluna vazia (janela do banner)** · shortcode | eyebrow · H1 · parágrafo · caixa de 3 pontos · 2 botões | primary + outline-light; coluna 3 = `SHORTCODE_CHAT` |
| 2 | **Linhas de produto** | branco | `pt-20 pb-10` | cabeçalho à esquerda + carrossel de logos à direita; 4 cards `sm:2 lg:4 gap-5` | `LINHAS_DE_PRODUTO`; o 4º card é escuro (marcas) | link de card "Falar com especialista" |
| 3 | **Painel de apoio** | branco com painel `navy-premium rounded-2xl` | `pt-6 pb-16` | título+texto à esquerda ⟷ botão à direita; faixa de 6 itens `2/3/6 cols` com divisórias | "Precisa identificar…?" + `DADOS_QUE_O_CLIENTE_PODE_ENVIAR` | primary com glow laranja + microcopy com ícone shield |
| 4 | **Aplicações** | branco | `pt-4 pb-20` | cabeçalho **centrado** `max-w-4xl`; 4 cards-botão com foto 4:3 | `APLICACOES` | card inteiro é `btn-slave-whats` |
| 5 | **Segmentos** | `neutral-gray-100` | `py-16` | grid `260px · 1fr · 1fr` (tabs verticais · painel visual com foto e corte diagonal laranja · detalhe com ícone, título, traço, texto, 3 bullets, botão) | `SEGMENTOS` (8 tabs; mobile = trilho horizontal) | primary por painel |
| 6 | **Diferenciais** | gray-100 com bloco navy full-bleed | `pt-6 pb-8` | bloco: texto 46% + foto/pessoa 49–52% à direita; 5 cards sobrepostos `-mt-16` `lg:grid-cols-5` (mobile: trilho snap + setas) | `FRASE_DE_AUTORIDADE` + `DIFERENCIAIS` | primary com glow |
| 7 | **Cotação** — **ESTRUTURA FIXA, ver 4.1.4** | `neutral-gray-100` | `pt-8 pb-20` | grid `1.05fr · 1fr` (form · texto). Mobile: texto antes do form (`order`) | eyebrow · H2 · traço · parágrafo · botão WhatsApp navy · `SELOS_DE_CONFIANCA` | `SHORTCODE_FORM` + "Chamar no WhatsApp" |
| 8 | **Footer** — **ESTRUTURA FIXA, ver 4.1.5** | `navy-premium border-t border-white/15` | `py-6` | © · endereço com pin · "Desenvolvido por B2 Marketing Industrial" | `ENDERECO` | — |

Regras de ritmo:
- Alternância de fundo: navy → branco → branco(+painel navy) → branco → cinza → cinza(+bloco navy) → cinza → navy.
- Padding assimétrico: o `pt` da seção seguinte compensa o `pb` da anterior. Nunca dois `py-20` seguidos.
- Container único em todas as seções: `mx-auto max-w-page px-6 lg:px-10`.
- Alinhamento à esquerda por padrão; centralizado somente em galerias simétricas.

## 4.1 Estrutura base fixa (Header, Hero, Cotação e Footer)

Estas quatro peças são **idênticas em todas as LPs**. Copie a estrutura, o grid, as medidas e a ordem exatamente como descrito. O que muda é só conteúdo (textos, logo, foto, shortcodes). Se achar que precisa alterar algo estrutural aqui, pare e pergunte.

### 4.1.1 Header

```
<header class="sticky top-0 z-50 bg-primary-dark-900">
  <div class="mx-auto flex max-w-page items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-6 lg:px-10">

    <!-- 1. Logo em placa branca "pendurada" abaixo da barra -->
    <a href="/" class="flex shrink-0 items-center self-start">
      <span class="-mt-3 -mb-10 flex items-center rounded-b-xl bg-neutral-light px-3 pt-1.5 pb-1
                   shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)] sm:px-6 sm:pt-2 sm:pb-1.5">
        <Image src={logo} alt="{{MARCA}}" width={240} height={200} format="webp"
               loading="eager" fetchpriority="low" decoding="async"
               class="-mt-1 -mb-0.5 h-14 w-auto sm:-mt-2 sm:-mb-1 sm:h-24" />
      </span>
    </a>

    <!-- 2. Tagline central (some no mobile) -->
    <span class="hidden flex-1 text-center font-display text-[15px] font-extrabold tracking-[0.14em]
                 text-neutral-light uppercase sm:block lg:text-[17px]">
      {{PRODUTO_PRINCIPAL}}
    </span>

    <!-- 3. CTA laranja, uppercase, rótulo curto no mobile -->
    <button type="button"
      class="btn-slave-whats inline-flex shrink-0 items-center bg-accent-orange px-4 py-2 font-sans
             text-[11px] font-bold uppercase tracking-[0.04em] text-neutral-light transition-colors
             duration-200 hover:bg-accent-orange-dark sm:px-6 sm:py-2.5 sm:text-[13px] sm:tracking-[0.06em]">
      <span class="sm:hidden">Cotação</span>
      <span class="hidden sm:inline">Solicite sua cotação</span>
    </button>
  </div>
</header>
```

Regras: sem menu, sem links de âncora, sem telefone no header. A placa branca do logo **invade a seção seguinte** (`-mb-10`); o Hero já conta com isso no `py-20`. Logo com fundo transparente ou branco, altura útil 56px mobile / 96px desktop.

### 4.1.2 Hero de três colunas

Grid desktop (`lg`, container 1320px, `px-10`):

```
| coluna 1: texto (1fr ≈ 622px) | gap 24 | coluna 2: VAZIA (270px) | gap 24 | coluna 3: shortcode (300px) |
```

- **Coluna 1** recebe, nesta ordem: `<Eyebrow tone="light">` · `h1` · parágrafo · caixa de 3 pontos com ícone · 2 botões (primary "Solicite sua cotação" + outline-light "Identifique seu {{produto}}" com ícone `search` à esquerda). Largura máxima do texto `max-w-xl` no mobile e `lg:max-w-none`.
- **Coluna 2 é intencionalmente vazia** (`<div class="hidden lg:block" aria-hidden="true">`). É a "janela" por onde o banner de fundo mostra o produto/serviço. Nunca coloque conteúdo nela.
- **Coluna 3** é `w-full lg:w-[300px]` e renderiza `SHORTCODE_CHAT` via `<slot name="shortcode">`. Fallback: caixa tracejada `min-h-[430px] border border-dashed border-neutral-light/35 bg-primary-dark-900/80 backdrop-blur-sm` com o rótulo "Espaço reservado · Shortcode — 300px".
- No mobile o grid vira uma coluna: texto, depois shortcode. A coluna 2 some.

Camadas de fundo, de trás para frente (todas `absolute`, `pointer-events-none` exceto a foto):

| z | Camada | Regra |
|---|---|---|
| 1 | `.hero-photo` com `<Picture>` do banner | mobile: `inset-0` full-width `object-cover`. Desktop: `left:auto; right: var(--page-edge); width: 1700px` — ancorada na **borda direita do container**, não do viewport |
| 2 | `.hero-navy` (véu esquerdo) | mobile: full-width, gradiente navy → transparente a 96%. Desktop: `width: calc(50% - 20px)`, gradiente `to left`: transparente 0 → `rgb(0 24 48 / .45)` 70px → navy-800 150px → navy sólido |
| 2 | `.hero-navy-right` (véu direito) | só desktop: `width: calc(50% - 261px)`, gradiente `to right`: transparente 0 → `rgb(0 24 48 / .55)` 200px → navy-900 364px |
| 3 | `.hero-dots` | malha de pontos `radial-gradient(circle, white/.5 1px, transparent 1px)` 28px, `opacity .35`, desktop `width: calc(50% - 60px)` com máscara que esmaece à direita |
| 4 | mira técnica | svg `size-4 text-white/50` em `left-6 top-6` |
| 5 | conteúdo | `relative z-[5] mx-auto max-w-page px-6 py-20 lg:px-10 lg:py-24` |

Variáveis que amarram tudo ao container (declarar nas classes `.hero-photo, .hero-navy, .hero-navy-right, .hero-dots, .hero-grid`):

```css
--page-half: calc(var(--container-page) / 2);
--page-edge: max(0px, calc(50% - var(--page-half)));
```

Foto do hero: `Picture` com `widths={[640,1024,1536,1981]}`, `sizes="(min-width: 1024px) 1700px, 100vw"`, `formats={['avif','webp']}`, `loading="eager"`, `fetchpriority="high"`, mais `<link rel="preload" imagesrcset>` no head. Seção com `border-b border-white/15` e `bg-primary-dark-900` como cor de segurança.

Caixa de 3 pontos: `inline-flex flex-wrap gap-x-5 gap-y-3 rounded-xl border border-white/10 bg-primary-dark-900/55 px-3.5 py-2.5 backdrop-blur-md`, cada ponto = badge `size-10 rounded-lg border border-white/25 bg-white/10` + texto em **duas linhas fixas** (`line1`/`line2`, `whitespace-nowrap`) `text-[13.5px] font-semibold` com `text-shadow`. Divisória `border-left white/18` entre pontos a partir de `sm`.

### 4.1.3 Brief do banner de fundo (obrigatório para quem cria a imagem)

O banner é desenhado **para o grid acima**, não o contrário. Entregue este brief ao designer ou à ferramenta de geração antes de pedir a imagem:

| Item | Especificação |
|---|---|
| Arquivo | `src/assets/heroBg.png` (ou `.jpg`), **1981 × 900 px** (proporção ≈ 2,2:1), sRGB, até 2,5 MB. O build gera AVIF/WebP em 640/1024/1536/1981 |
| Paleta | fundo em tons navy entre `#001830` e `#003669`, para se fundir aos véus. Sem texto, sem logo, sem marca d'água |
| **Zona A — 0 a 55% da largura** | fundo escuro quase uniforme (cenário desfocado, textura técnica). Fica **totalmente coberta** pelo véu navy, pelos pontos e pelo texto. Nada importante aqui |
| **Zona B — 62 a 79% da largura, centro em ~70%** | o **assunto principal** (produto, peça, equipamento ou cena do serviço): nítido, iluminado, com contraste contra o fundo. É a coluna 2 do grid. Única área que aparece sem véu no desktop |
| **Zona C — 79 a 100% da largura** | escurece progressivamente; recebe o véu direito e a coluna do shortcode. Pode continuar o cenário, sem ponto de foco |
| Vertical | assunto centrado, ocupando 60–80% da altura, e contido nos **65% centrais** da altura (o `object-cover` corta topo e base em telas muito largas ou muito baixas) |
| Direção de luz | vinda da esquerda/cima, para o assunto "sair" do navy e o lado direito cair em sombra |
| Mobile | a imagem vira full-width sob véu navy quase sólido; o assunto aparece atrás do texto, à direita, de forma sutil. Por isso ele **não pode ser a única forma** de entender o produto: o H1 faz esse papel |
| Validação | rodar `npm run dev`, abrir em 1440 px e 1920 px e confirmar: o assunto está entre o fim do texto e o início do shortcode, sem invadir nenhum dos dois. Se invadir, ajustar a imagem, **não o grid** |

Como conferir a posição sem chute: com o container em 1320px, a coluna 2 fica entre **634px e 364px contados da borda direita do container**. Como a foto tem 1700px e é alinhada nessa mesma borda, o assunto deve estar entre **1066px e 1336px** contados da esquerda da foto renderizada (62–79%).

### 4.1.4 Seção final de Cotação

```
<section id="cotacao" class="bg-neutral-gray-100 pt-8 pb-20">
  <div class="mx-auto max-w-page px-6 lg:px-10">
    <div class="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center lg:gap-16">

      <!-- Coluna 1 (desktop) / segunda no mobile: formulário -->
      <div class="order-2 w-full lg:order-1">
        <slot name="shortcode">
          <!-- fallback: caixa tracejada min-h-[520px] rounded-2xl border-dashed border-primary-dark/25 bg-neutral-light
               com "Espaço reservado · Shortcode — formulário de cotação" -->
        </slot>
      </div>

      <!-- Coluna 2 (desktop) / primeira no mobile: texto -->
      <div class="order-1 lg:order-2">
        <Eyebrow>Solicite sua cotação</Eyebrow>
        <h2 class="mt-3 font-display text-3xl leading-tight font-extrabold text-ink sm:text-4xl">
          Fale com quem entende de {{PRODUTO_PRINCIPAL em minúsculas}}.
        </h2>
        <span aria-hidden="true" class="mt-5 block h-[3px] w-16 bg-accent-orange"></span>
        <p class="mt-5 font-sans text-[15px] leading-relaxed text-ink-soft sm:text-base">
          {{1 frase: equipe pronta para identificar, especificar e cotar + "Preencha o formulário ou fale direto conosco pelo WhatsApp."}}
        </p>
        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button"
            class="btn-slave-whats inline-flex items-center justify-center gap-2.5 bg-primary-dark px-6 py-3.5
                   font-sans text-[15px] font-semibold text-neutral-light transition-colors duration-200 hover:bg-primary-dark-800">
            <Icon name="whatsapp" class="size-4 shrink-0" /> Chamar no WhatsApp
          </button>
        </div>
        <ul class="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
          <!-- SELOS_DE_CONFIANCA: 3 × <li class="flex items-center gap-2 text-[13px] font-medium text-ink"><Icon class="size-4 text-accent-orange"/> texto</li> -->
        </ul>
      </div>
    </div>
  </div>
</section>
```

Regras: o formulário é sempre o `SHORTCODE_FORM`, nunca um `<form>` próprio. O botão de WhatsApp é navy (não laranja) para não competir com o botão de envio do formulário. No mobile o texto vem **antes** do formulário. A seção anterior (Diferenciais) termina em `pb-8` e esta começa em `pt-8`, então os cards sobrepostos de Diferenciais encostam visualmente nesta seção sem espaço duplo.

### 4.1.5 Footer

```
---
import Icon from './Icon.astro'
import { site } from '../data/site'
const year = new Date().getFullYear()
---

<footer class="navy-premium border-t border-white/15">
  <div class="mx-auto flex max-w-page flex-col items-center gap-3 px-6 py-6 text-center
              lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-10 lg:text-left">

    <!-- 1. Copyright (ano automático) -->
    <p class="shrink-0 font-sans text-xs text-neutral-light/55">
      © {year} {site.brand}. Todos os direitos reservados.
    </p>

    <!-- 2. Endereço com pin laranja -->
    <address class="flex items-center gap-2 font-sans text-xs not-italic text-neutral-light/70 lg:whitespace-nowrap">
      <Icon name="map-pin" class="size-3.5 shrink-0 text-accent-orange" />
      <span>{site.address}</span>
    </address>

    <!-- 3. Crédito da agência (único link externo da página) -->
    <p class="shrink-0 font-sans text-xs text-neutral-light/55">
      Desenvolvido por{' '}
      <a href="https://b2marketingindustrial.com.br" target="_blank" rel="noopener noreferrer"
         class="font-semibold text-neutral-light/80 transition-colors hover:text-accent-orange">
        B2 Marketing Industrial
      </a>
    </p>
  </div>
</footer>
```

Regras do footer:

- **Uma linha só, três itens, nesta ordem**: copyright · endereço · crédito da B2. Desktop em linha (`justify-between`), mobile empilhado e centralizado.
- Fundo `navy-premium` com `border-t border-white/15` para separar da seção de Cotação (cinza). Padding `py-6`, nunca maior: o footer é um fechamento, não uma seção.
- Tipografia única `text-xs`; opacidades `55` para texto neutro, `70` para o endereço, `80` para o link. Único acento de cor é o pin laranja e o hover do link.
- Sem menu, sem redes sociais, sem telefone, sem e-mail, sem logo repetido, sem formulário. Contato é papel dos CTAs e do shortcode, não do footer.
- Ano gerado em build (`new Date().getFullYear()`); marca e endereço vêm de `site.ts` (`MARCA`, `ENDERECO`), nunca digitados no componente.
- O link da B2 é o **único** `<a>` externo da página e leva `rel="noopener noreferrer"`. Se o cliente exigir CNPJ ou política de privacidade, entram como quarto item `text-xs text-neutral-light/55` depois do endereço, sem mudar o layout.

## 4.2 Seções fora do template: guia de layout obrigatório

Sempre que criar uma seção, card, painel ou lista que **não existe no template**, siga `docs/GUIA-LAYOUT.md` (vem junto com o template). Ele fixa a escala de espaçamentos, grids, raios, bordas, sombras, ícones, tipografia e movimento, com esqueletos prontos para grid de cards, painel navy, split texto+mídia e trilho mobile. Regras-síntese, para quando o arquivo não estiver à mão:

| Aspecto | Regra |
|---|---|
| Padding de seção | soma `pb (anterior) + pt (seguinte)` entre 80 e 104px no mesmo fundo; até 128 quando o fundo muda. Combinações válidas: `pt-20 pb-10` · `pt-6 pb-16` · `pt-4 pb-20` · `py-16` · `pt-6 pb-8` · `pt-8 pb-20` |
| Cabeçalho | Eyebrow `→ mt-3 →` H2 `→ mt-3 →` parágrafo; traço laranja (`mt-5`, `h-[3px] w-16`) só em navy ou conversão; corpo em `mt-8/9/10` |
| Grid | cards `gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5`; split `gap-10 lg:gap-16` com `1.05fr/1fr`; faixa de itens sem gap com divisórias `border-white/10` |
| Card | `rounded-2xl border border-neutral-gray-200/70 bg-neutral-light shadow-[0_1px_2px_rgba(13,29,48,0.05)]` + barra de acento `h-[3px]` + `hover:-translate-y-1.5 hover:border-accent-orange/50`; conteúdo `px-6 pt-4 pb-4`; título `→ mt-2 →` descrição `→ mt-4 →` bullets `gap-2` |
| Raios | superfícies `rounded-2xl` (16) · tabs/caixas `rounded-xl` · badges `rounded-full` · **botão de CTA sem raio** |
| Bordas | 1px em `/70` (claro) ou `/10–/15` (navy); 2px só em anéis e cantos técnicos; 3px só em acentos laranja |
| Sombras | só as do guia (`shadow-[…]` com spread negativo); nunca `shadow-lg` |
| Ícones | 24×24 stroke 1.6; `size-3` em check `size-5`; `size-3.5` em chip `size-8`; `size-4` em botão/tab/selo; `size-[18px]` em badge `size-9/10/11`; laranja só como marcação |
| Tipografia | H2 `text-3xl sm:text-4xl font-extrabold leading-tight` · H3 `text-lg font-extrabold leading-snug` · corpo de seção `text-[15px] leading-relaxed text-ink-soft` · corpo de card `text-[13px]` · eyebrow `text-[12px] uppercase tracking-[0.16em]` · índice `text-[11px] tracking-[0.2em]` |
| Movimento | cor 200ms · card 300ms ease-out · imagem 500ms · sempre com guarda `prefers-reduced-motion` |
| Breakpoints | só `sm`, `lg`, `xl`; listas de 4+ cards viram trilho `snap-x` abaixo de `lg` com setas |

Registre no resumo final qualquer seção nova e qual esqueleto do guia ela seguiu.

## 5. Anatomia de seção (copiar literalmente)

```html
<section id="{{slug}}" class="bg-neutral-light pt-X pb-Y" data-{{nome}}>
  <div class="mx-auto max-w-page px-6 lg:px-10">
    <div class="max-w-2xl">
      <Eyebrow>{{Rótulo}}</Eyebrow>
      <h2 class="mt-3 font-display text-3xl leading-tight font-extrabold text-ink sm:text-4xl">{{Título}}</h2>
      <p class="mt-3 font-sans text-[15px] leading-relaxed text-ink-soft">{{Uma frase}}</p>
    </div>
    <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">…</ul>
  </div>
</section>
```

Variante sobre navy: `<Eyebrow tone="light">`, H2 `text-neutral-light`, traço `<span aria-hidden="true" class="mt-5 block h-[3px] w-16 bg-accent-orange">`, parágrafo `mt-5 text-neutral-light/75`, botão `mt-7`.

## 6. Escala tipográfica

| Papel | Classes |
|---|---|
| H1 | `font-display text-[2.75rem] sm:text-[3rem] xl:text-[3.1rem] font-extrabold leading-[1.1]` |
| H2 | `font-display text-3xl sm:text-4xl font-extrabold leading-tight` (`xl:text-[44px]` no bloco de diferenciais) |
| H3 card | `font-display text-lg font-extrabold leading-snug` |
| H3 painel | `font-display text-2xl lg:text-[28px] font-extrabold leading-tight` |
| Corpo seção | `font-sans text-[15px] leading-relaxed text-ink-soft` |
| Corpo card | `text-[13px] leading-relaxed text-ink-soft`; features `text-[13px] font-medium text-ink` |
| Eyebrow | `text-[12px] font-semibold uppercase tracking-[0.16em]` + quadrado 6px laranja |
| Índice | `text-[11px] font-extrabold tracking-[0.2em]`, sempre `"01"…"0N"` |
| Chip/tag | `text-[10px] font-bold uppercase tracking-[0.16em]` em pílula branca |
| Botão | `text-[15px] font-semibold`; link de card `text-[13px] font-bold`; header `text-[11–13px] font-bold uppercase` |

## 7. Receitas de componente

- **Card claro**: `rounded-2xl border border-neutral-gray-200/70 bg-neutral-light shadow-[0_1px_2px_rgba(13,29,48,0.05)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-accent-orange/50 hover:shadow-[0_28px_56px_-28px_rgba(0,33,71,0.35)]` + barra `absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent-orange group-hover:scale-x-100`.
- **Card escuro** (1 por grid, para destaque): `navy-premium border-white/10`, textos `neutral-light/65–90`.
- **Painel navy**: `navy-premium rounded-2xl border border-white/12` + malha blueprint mascarada + brilho `absolute -top-24 -right-20 size-72 rounded-full bg-accent-orange/15 blur-3xl` + cantos laranja 18px via `::before/::after`.
- **Badge de vidro**: `rounded-full`, gradiente `white/16 → white/4`, `border white/16`, `inset 0 1px 0 white/22`, brilho interno laranja; anel laranja no hover.
- **Bullet check**: `span.size-5 rounded-full bg-accent-orange/10 text-accent-orange` + ícone `check size-3`. Sobre navy: `bg-accent-orange/20`.
- **Chip de seta**: `size-8 rounded-full bg-neutral-gray-100 text-primary-dark group-hover:translate-x-0.5 group-hover:bg-accent-orange group-hover:text-neutral-light`.
- **Button**: `inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-sans text-[15px] font-semibold transition-colors duration-200`, **cantos retos**, ícone `arrow-right` à direita por padrão. Variantes: `primary` (laranja), `outline-light` (borda `white/35`), `outline-dark` (borda `ink/25`). Sempre inclui `btn-slave-whats`.
- **Eyebrow**: `inline-flex items-center gap-2.5` + `span.h-[6px] w-[6px] bg-accent-orange` + slot; `tone="light"` → `text-neutral-light/70`, default `text-ink-soft`.
- **Carrossel de logos**: lista duplicada, `translateX(-50%)` em 26s linear infinito, pausa no hover, `container-type: inline-size` e `width: calc(100cqw / 5)` por item, máscara lateral de 48px.
- **Tabs acessíveis**: `role="tablist"` vertical, `role="tab"` com `aria-selected`/`aria-controls`/roving `tabindex`, setas + Home/End, painéis alternados por `hidden`, entrada `320ms` opacity+translateY(6px).
- **Trilho mobile**: `-mx-6 px-6 flex snap-x snap-mandatory gap-4 overflow-x-auto` + scrollbar oculta + setas prev/next `lg:hidden` que rolam `card.offsetWidth + 16`.

## 7.1 Catálogo de ícones (`src/data/icons.ts`)

Só estes nomes existem. Na entrevista, ofereça-os como opções; não invente nomes. Se nenhum servir, adicione o ícone ao catálogo (24×24, stroke, sem cor) e registre no resumo.

| Grupo | Nomes |
|---|---|
| Ação / navegação | `search` `arrow-right` `arrow-down` `chevron-down` `chevron-right` `menu` `close` `upload` `check` |
| Confiança / atendimento | `shield` `badge-check` `users` `clock` `map-pin` `pin` `phone` `mail` `chat` `whatsapp` `truck` |
| Produto / técnico | `gear` `sliders` `layers` `box` `cylinder` `circle` `disc` `target` `crosshair` `ruler` `barcode` `hash` `tag` `camera` `wrench` `bolt` `zap` `droplet` `move` `grid` `chip` `cpu` `settings-2` `file` `file-text` |
| Segmentos | `factory` `building` `mountain` `flame` `utensils` `leaf` `trend-up` `more-horizontal` `dots` |
| Redes (só se o cliente exigir) | `linkedin` `instagram` `youtube` |

Sugestões por uso: dados enviáveis → `barcode` `tag` `camera` `ruler` `factory` `target`; diferenciais → `search` `sliders` `layers` `users` `wrench`; selos → `clock` `shield` `map-pin`; hero → `shield` `gear` `truck`.

## 8. Regras de copy

- PT-BR, sentence case, sem ponto final em títulos, features e bullets.
- Eyebrow: 1–3 palavras (substantivo). H2: 3–8 palavras, benefício ou pergunta. Parágrafo de seção: 1 frase, 90–160 caracteres. Descrição de card: 1 frase, 50–90 caracteres. Feature/bullet: 2–4 palavras.
- Quantidades fixas: 3 pontos no hero · 3–4 linhas de produto · 6 dados enviáveis · 4 aplicações · 8 segmentos (o 8º é "Outras aplicações" apontando para contato) · 5 diferenciais · 3 selos de confiança.
- Vocabulário de CTA (não variar): primário **"Solicite sua cotação"** · secundário **"Identifique seu {{produto}}"** · card **"Falar com especialista"** · contato **"Chamar no WhatsApp"** · header mobile **"Cotação"**.
- Marcas representadas aparecem por extenso no H1/descrição/meta e como logos no carrossel.
- Microcopy de confiança: ícone laranja `size-4` + frase de 3–5 palavras.
- `alt` descritivo em PT-BR, sem "imagem de".
- Cada lista vive num `const x = [...] as const` (ou `readonly Tipo[]` com `interface`) no topo da seção; o markup só faz `.map`.

## 9. Imagens

- **LCP (hero)**: `Picture` com `widths=[640,1024,1536,1981]`, `formats=['avif','webp']`, `loading="eager"`, `fetchpriority="high"`, e `<link rel="preload" as="image" imagesrcset imagesizes fetchpriority="high">` no head.
- **Demais**: `format="webp"`, `width` explícito (360 produto · 640 card · 900 painel · 1220 pessoa), `loading="lazy"`, `decoding="async"`.
- Card com foto: `aspect-[4/3] object-cover` + véu `h-14 bg-gradient-to-t from-primary-dark-900/55`.
- Produto recortado: `object-contain mix-blend-multiply max-h-[7.75rem]` sobre palco `#f5f7fa→#fff` com pontos radiais mascarados + sombra elíptica.
- Logo do header: eager, `fetchpriority="low"`, altura `h-14 sm:h-24`.
- Fonte das imagens em `src/assets/<seção>/`, nunca em `public/` (exceto favicon). OG image = logo 512px.

## 10. Conversão e integração WordPress

- `site.url` = `URL_FINAL` absoluta (og:url).
- Todo botão: `<button type="button" class="btn-slave-whats …">`. Cards de aplicação: o `<button>` envolve o card inteiro.
- Slot do Hero renderiza `SHORTCODE_CHAT` numa coluna `lg:w-[300px]`; slot da Cotação renderiza `SHORTCODE_FORM` com `min-h-[520px]`. Placeholder tracejado quando vazio: rótulo "Espaço reservado" laranja + "Shortcode — …".
- `WHATSAPP` vazio desliga o botão flutuante; preenchido, renderiza botão fixo inferior-direito com ícone `whatsapp`.
- Publicação `wp-build`: workflow em `BRANCH_PRINCIPAL` → `npm ci` → `npm run build` → `test -f dist/index.html` → `git init -b wp-build` dentro de `dist/` → force-push. `concurrency: wp-build` com `cancel-in-progress: true`. Para Next, trocar `dist/` por `out/`.

### 10.1 Rastreamento de CTAs

Todo CTA leva `data-cta="{secao}-{elemento}"`, único na página (itens gerados em `.map` usam o `id` do item). Nomes fixos: `header-cta` · `hero-primary` · `hero-secondary` · `linhas-{id}` · `identificar-cta` · `aplicacoes-{id}` · `segmentos-{id}` · `diferenciais-cta` · `cotacao-whatsapp` · `float-whatsapp`. O `Button.astro` do template exige a prop `cta`; botões escritos à mão precisam do atributo explícito. `npm run check:lp` falha se faltar ou repetir. Entregue ao cliente a lista de `data-cta` para configurar os eventos no GTM/GA4.

### 10.2 LGPD

Abaixo do slot do formulário há uma nota fixa (`quote.lgpd` em `content.ts`) e, quando `site.privacyUrl` estiver preenchido, o link "Política de privacidade". Pergunte o link na entrada 15; se o cliente não tiver política, mantenha só a nota e registre como pendência no briefing.

## 11. SEO e acessibilidade

- `<title>`: "{{PRODUTO_PRINCIPAL}} para {{CONTEXTO_DE_USO}} | {{MARCA}}". `description` ≤ 160 chars citando marcas + apoio técnico.
- `lang="pt-BR"`; OG: `type, locale, site_name, title, description, url, image`.
- Skip link "Pular para o conteúdo" → `<main id="main">`. Um `h1`, um `h2` por seção, `h3` em cards.
- Decorativos: `aria-hidden="true"` + `pointer-events-none`. Listas com `aria-label`. SVG informativo com `role="img"` + `aria-label`.
- Tabs e trilhos navegáveis por teclado.

## 12. Tooling e entrega

- `package.json` scripts: `dev`, `build`, `preview`, `check`, `lint`, `format`, `format:check`.
- Prettier `.prettierrc.json`: `semi false · singleQuote · printWidth 100 · trailingComma all · plugins [astro|tailwindcss] · tailwindStylesheet ./src/styles/global.css`.
- ESLint flat: `js.recommended`, `tseslint.recommended`, `astro.recommended` (ou `next/core-web-vitals`), `eslint-config-prettier`.
- `.gitignore`: `dist/ out/ .astro/ node_modules/ .env*`.
- Commits em português, prefixo convencional: `feat:`, `fix:`, `style:`, `ci:`, `chore:`.

### 12.1 Scripts do template e ordem de execução

| Comando | Quando |
|---|---|
| `npm run check:lp` | a cada alteração em `content.ts`, `site.ts` ou componentes. Verifica CTAs sem `data-cta`, `href="#"`, `transition` sem `prefers-reduced-motion`, número de `h1`, ids de seção, imagens sem `alt`/`loading`, slots de shortcode, assinaturas da estrutura fixa, quantidades do conteúdo, `site.url` absoluta, ícones inexistentes |
| `npm run check` | tipos do Astro; acusa tupla errada em `content.ts` |
| `npm run verify` | `check:lp` + lint + prettier + build, na mesma ordem do CI. **Obrigatório antes de dizer que terminou** |
| `npm run screens` | após o build: screenshots em 360/768/1440/1920 e `?grid=1` em `docs/screens/`. Exige `npx -y playwright@1.58.2 install chromium` uma vez. Serve `dist/` numa porta própria (4873) e recusa capturar se a porta estiver servindo outra LP |
| `npm run lh` | Lighthouse CI sobre `dist/` com limites em `lighthouserc.json` (performance ≥ 0,9, acessibilidade ≥ 0,95, LCP ≤ 2,5 s, CLS ≤ 0,1) |

Branch principal é **`main`** em toda LP nova. O workflow `build-wp.yml` só dispara nela. Exploração de layout é branch + PR, nunca pasta `staging/` com script de patch.

## 13. Checklist de entrega (Definition of Done)

Antes de dizer que terminou, verifique e reporte cada item:

- [ ] `npm run verify` passa (check:lp + lint + prettier + build) e a saída está colada na resposta.
- [ ] `docs/BRIEFING.md` com as 21 entradas em `confirmado`/`default`, assets com status real e aprovação datada.
- [ ] Todo CTA tem `data-cta` único no formato `secao-elemento`; lista entregue para o GTM.
- [ ] Nota de LGPD visível abaixo do formulário; link de privacidade presente ou pendência registrada.
- [ ] `docs/screens/` com 360, 768, 1440, 1920 e `1440-grid` gerados a partir do build final.
- [ ] `site.ts` e `content.ts` sem valores de exemplo do template ("Empresa Exemplo", "Marca 1", placeholders).
- [ ] Ordem de seções e fundos conforme a tabela do item 4; nenhum `py` grande duplicado entre seções.
- [ ] Header idêntico ao 4.1.1: placa branca do logo, tagline central, CTA laranja com rótulo curto no mobile.
- [ ] Hero idêntico ao 4.1.2: grid `1fr 270px 300px`, coluna 2 vazia, foto ancorada em `right: var(--page-edge)` com 1700px, véus e pontos nas larguras especificadas, slot do chat em 300px.
- [ ] Banner validado em 1440 e 1920 px: assunto dentro da coluna 2, sem invadir texto nem shortcode (item 4.1.3).
- [ ] Cotação idêntica ao 4.1.4: grid `1.05fr · 1fr`, formulário via shortcode à esquerda, texto à direita, WhatsApp navy, 3 selos; no mobile o texto vem antes.
- [ ] Footer idêntico ao 4.1.5: uma linha com copyright, endereço com pin e crédito da B2; ano automático; marca e endereço vindos de `site.ts`; nenhum outro link, menu ou contato.
- [ ] Todos os CTAs são `button.btn-slave-whats`; nenhum `href="#"` ou `onClick`.
- [ ] Dois slots de shortcode presentes com placeholder de fallback.
- [ ] Um `h1`; `h2` em cada seção; `id`s em português.
- [ ] Hero com `Picture` eager + preload; todas as outras imagens lazy com `width`.
- [ ] Toda transição/animação tem `prefers-reduced-motion`.
- [ ] Tabs e trilhos funcionam por teclado; foco visível laranja.
- [ ] Copy respeita quantidades e vocabulário de CTA do item 8.
- [ ] Nenhum componente, asset ou utility sem uso ficou no repositório.
- [ ] `og:url` absoluta; `title` e `description` no formato do item 11.
- [ ] Workflow de publicação aponta para `BRANCH_PRINCIPAL` correta.
- [ ] Mobile 360px: sem scroll horizontal na página; trilhos com setas; header com CTA curto.

## 14. Formato da sua resposta

1. Repita a tabela final da entrevista (entrada → valor usado), marcando quais vieram de default e quais assets ficaram pendentes.
2. Mostre a árvore de arquivos criada/alterada.
3. Para cada seção, uma linha: nome · id · fundo · quantidade de itens · CTA.
4. Saída dos comandos `build`, `lint` e `format:check`.
5. Checklist do item 13 marcado, com o que ficou pendente e por quê.
6. Caminhos dos screenshots em `docs/screens/` e a lista de `data-cta` da página.
7. Versão do padrão seguida (meta `b2-lp-standard`) e qualquer desvio do template, com justificativa.
