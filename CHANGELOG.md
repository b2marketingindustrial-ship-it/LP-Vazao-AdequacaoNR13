# Changelog do padrão B2 de landing pages

Formato: versão · data · mudanças. A versão vive em `package.json`, em `site.standardVersion` e na meta `b2-lp-standard` do HTML. Cada LP registra no `docs/BRIEFING.md` qual versão seguiu.

## 1.0.0 — 2026-09-22

Primeira versão do template, extraída da LP Pioneira Rolamentos.

- Estrutura base fixa: Header, Hero de três colunas (janela do banner), Cotação e Footer.
- Copy centralizado em `src/data/content.ts` com tipos que travam as quantidades do padrão.
- Catálogo de ícones em `src/data/icons.ts`.
- `data-cta` obrigatório em todo CTA (`{secao}-{elemento}`).
- Overlay de depuração do hero (`?grid=1`) e brief do banner (zona 62–79%).
- Mock de shortcode em desenvolvimento; placeholder tracejado em produção.
- JSON-LD Organization, canonical, meta de versão, nota de LGPD.
- `npm run check:lp` (regras do padrão), `npm run screens` (Playwright), `npm run lh` (Lighthouse CI).
- Workflow `wp-build` em `main` com verificação antes do build.
- `docs/GUIA-LAYOUT.md`: escala de espaçamentos, grids, raios, bordas, sombras, ícones, tipografia e movimento, com esqueletos para seções fora do template.
- Protocolo de briefing do cliente (prompt, seção 0): leitura integral, classificação A/B, tabela de extração das 21 entradas, mapa de aproveitamento de estrutura e entrevista reduzida. Pasta `docs/briefing-cliente/`.
