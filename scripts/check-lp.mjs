#!/usr/bin/env node
/**
 * check:lp — verifica automaticamente as regras do padrão B2 (PROMPT-PADRAO-LP, item 13).
 * Falha (exit 1) se qualquer regra for violada. Roda no CI antes do build.
 */
import { readFileSync, readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, relative, extname } from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const errors = []
const warnings = []
const fail = (file, msg) => errors.push(`${relative(ROOT, file)}: ${msg}`)
const warn = (file, msg) => warnings.push(`${relative(ROOT, file)}: ${msg}`)

function walk(dir, exts) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) out.push(...walk(p, exts))
    else if (exts.includes(extname(p))) out.push(p)
  }
  return out
}

const astroFiles = walk(SRC, ['.astro'])
const rawRead = (f) => readFileSync(f, 'utf8')
/** Markup sem o frontmatter e sem comentários JSX, para não casar regras com texto de comentário. */
const read = (f) => {
  let s = rawRead(f)
  s = s.replace(/^---[\s\S]*?^---/m, '')
  s = s.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
  s = s.replace(/<!--[\s\S]*?-->/g, '')
  return s
}

/* 1. Nenhum <a href="#"> ou href="javascript:" ---------------------------- */
for (const f of astroFiles) {
  const s = read(f)
  if (/<a\b[^>]*href=["'](#["']|javascript:)/i.test(s))
    fail(f, 'link com href="#" ou javascript: — CTAs devem ser <button class="btn-slave-whats">')
}

/* 2. Todo botão btn-slave-whats tem data-cta; todo data-cta tem btn-slave-whats ou é o float */
for (const f of astroFiles) {
  const s = read(f)
  const tags = s.match(/<button\b[\s\S]*?>/g) ?? []
  for (const tag of tags) {
    const isSlave = /btn-slave-whats/.test(tag)
    const hasCta = /data-cta=/.test(tag)
    if (isSlave && !hasCta) fail(f, `botão btn-slave-whats sem data-cta: ${tag.slice(0, 80)}…`)
    if (!isSlave && !hasCta && !/role="tab"|data-why-(prev|next)/.test(tag)) {
      warn(f, `botão sem btn-slave-whats nem papel de UI (tab/seta): ${tag.slice(0, 80)}…`)
    }
  }
}

/* 3. data-cta únicos (fora de .map) e no formato secao-elemento ------------- */
{
  const seen = new Map()
  for (const f of astroFiles) {
    const s = read(f)
    for (const m of s.matchAll(/data-cta=(?:"([^"]+)"|\{`([^`]+)`\}|\{([^}]+)\})/g)) {
      const val = m[1] ?? m[2] ?? m[3]
      if (m[1] && !/^[a-z0-9]+-[a-z0-9-]+$/.test(m[1]))
        fail(f, `data-cta "${m[1]}" fora do formato secao-elemento`)
      if (m[1]) {
        if (seen.has(m[1])) fail(f, `data-cta "${m[1]}" duplicado (também em ${seen.get(m[1])})`)
        seen.set(m[1], relative(ROOT, f))
      }
      if (m[2] && !/\$\{/.test(m[2])) fail(f, `data-cta template sem variável: ${val}`)
    }
  }
}

/* 4. Arquivo com transition/animation precisa de prefers-reduced-motion ---- */
for (const f of astroFiles) {
  const s = read(f)
  const style = s.match(/<style[\s\S]*?<\/style>/g)?.join('\n') ?? ''
  const hasMotion = /transition\s*:|animation\s*:/.test(style)
  if (hasMotion && !/prefers-reduced-motion/.test(style))
    fail(f, '<style> com transition/animation sem @media (prefers-reduced-motion: reduce)')
}

/* 5. Um único h1; cada seção com id tem h2 ---------------------------------- */
{
  let h1 = 0
  for (const f of astroFiles) h1 += (read(f).match(/<h1\b/g) ?? []).length
  if (h1 !== 1) fail(join(SRC, 'components'), `esperado exatamente 1 <h1>, encontrado ${h1}`)

  for (const f of astroFiles) {
    const s = read(f)
    if (/<section\b[^>]*\bid=/.test(s) && !/<h2\b/.test(s)) fail(f, 'seção com id sem <h2>')
  }
}

/* 6. ids de seção obrigatórios --------------------------------------------- */
{
  const required = ['linhas', 'identificar', 'aplicacoes', 'segmentos', 'diferenciais', 'cotacao']
  const all = astroFiles.map(read).join('\n')
  for (const id of required) {
    if (!new RegExp(`<section\\b[^>]*\\bid="${id}"`).test(all))
      fail(join(SRC, 'components'), `falta <section id="${id}">`)
  }
  if (!/<main id="main"/.test(all))
    fail(join(SRC, 'pages'), 'falta <main id="main"> (alvo do skip link)')
}

/* 7. Imagens: alt obrigatório; lazy exceto o banner do hero ------------------ */
for (const f of astroFiles) {
  const s = read(f)
  const tags = s.match(/<(Image|Picture)\s[\s\S]*?\/>/g) ?? []
  for (const tag of tags) {
    if (!/\balt=/.test(tag)) fail(f, `<${tag.match(/<(\w+)/)[1]}> sem alt`)
    const eager = /loading="eager"/.test(tag)
    const lazy = /loading="lazy"/.test(tag)
    if (!eager && !lazy) fail(f, `imagem sem loading= explícito: ${tag.slice(0, 60)}…`)
    if (eager && !/Hero\.astro|Header\.astro/.test(f))
      fail(f, 'loading="eager" só é permitido no banner do Hero e no logo do Header')
  }
}

/* 8. Slots de shortcode presentes na página --------------------------------- */
{
  const page = read(join(SRC, 'pages', 'index.astro'))
  const slots = (page.match(/slot="shortcode"/g) ?? []).length
  if (slots !== 2)
    fail(
      join(SRC, 'pages', 'index.astro'),
      `esperados 2 slots shortcode (hero + cotação), encontrados ${slots}`,
    )
}

/* 9. Estrutura fixa: assinaturas do Header, Hero, Cotação e Footer ---------- */
{
  const expect = {
    'Header.astro': ['sticky top-0 z-50', '-mt-3 -mb-10', 'rounded-b-xl', 'data-cta="header-cta"'],
    'Hero.astro': [
      'grid-template-columns: minmax(0, 1fr) 270px 300px',
      'right: var(--page-edge)',
      'width: 1700px',
      'lg:w-[300px]',
      'data-hero-grid',
      'fetchpriority="high"',
    ],
    'QuoteForm.astro': [
      'id="cotacao"',
      'lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]',
      'order-2 w-full lg:order-1',
      'data-cta="cotacao-whatsapp"',
    ],
    'Footer.astro': [
      'navy-premium border-t border-white/15',
      'getFullYear()',
      '<address',
      'noopener noreferrer',
    ],
  }
  for (const [name, needles] of Object.entries(expect)) {
    const f = join(SRC, 'components', name)
    let s
    try {
      s = rawRead(f)
    } catch {
      fail(f, 'arquivo da estrutura fixa não existe')
      continue
    }
    for (const n of needles) if (!s.includes(n)) fail(f, `estrutura fixa alterada: falta "${n}"`)
  }
}

/* 10. site.ts e content.ts: valores e quantidades --------------------------- */
async function loadData() {
  const cacheDir = join(ROOT, 'node_modules', '.cache', 'lp-check')
  mkdirSync(cacheDir, { recursive: true })
  const files = ['site.ts', 'icons.ts', 'content.ts']
  for (const name of files) {
    let src = read(join(SRC, 'data', name))
    // imports de imagem viram stubs; imports locais apontam para os .mjs gerados
    src = src.replace(
      /^import\s+(\w+)\s+from\s+'\.\.\/assets\/[^']+'\s*$/gm,
      "const $1 = { src: '', width: 1, height: 1, format: 'png' }",
    )
    src = src.replace(/from\s+'\.\/(site|icons)'/g, "from './$1.mjs'")
    const out = ts.transpileModule(src, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        verbatimModuleSyntax: false,
      },
    }).outputText
    writeFileSync(join(cacheDir, name.replace('.ts', '.mjs')), out)
  }
  const site = await import(pathToFileURL(join(cacheDir, 'site.mjs')).href)
  const content = await import(pathToFileURL(join(cacheDir, 'content.mjs')).href)
  return { site, content }
}

try {
  const { site, content } = await loadData()
  const sf = join(SRC, 'data', 'site.ts')
  const cf = join(SRC, 'data', 'content.ts')

  if (!/^https:\/\//.test(site.site.url))
    fail(sf, `site.url deve ser absoluta (https://…), está "${site.site.url}"`)
  if (site.description.length > 160)
    fail(sf, `description com ${site.description.length} caracteres (máx. 160)`)
  if (site.title.length > 70) warn(sf, `title com ${site.title.length} caracteres (ideal ≤ 70)`)
  if (site.whatsapp && !/^\d{12,13}$/.test(site.whatsapp))
    fail(sf, 'whatsapp deve ter só dígitos com DDI+DDD (12–13 dígitos)')
  if (/Empresa Exemplo|exemplo\.com\.br|Rua Exemplo/.test(JSON.stringify(site.site)))
    warn(sf, 'site.ts ainda tem valores de exemplo do template')

  const count = (label, arr, n) => {
    if (arr.length !== n) fail(cf, `${label}: esperados ${n} itens, encontrados ${arr.length}`)
  }
  count('hero.points', content.hero.points, 3)
  count('supportPanel.items', content.supportPanel.items, 6)
  count('applications.items', content.applications.items, 4)
  count('segments.items', content.segments.items, 8)
  count('why.reasons', content.why.reasons, 5)
  count('quote.trust', content.quote.trust, 3)
  if (![3, 4].includes(content.productLines.items.length))
    fail(
      cf,
      `productLines.items: esperados 3 ou 4, encontrados ${content.productLines.items.length}`,
    )
  for (const l of content.productLines.items)
    if (l.features.length !== 3) fail(cf, `linha "${l.id}": 3 features obrigatórias`)
  for (const s of content.segments.items)
    if (s.bullets.length !== 3) fail(cf, `segmento "${s.id}": 3 bullets obrigatórios`)
  if (content.brands.length < 4 || content.brands.length > 8)
    warn(cf, `brands: ideal entre 4 e 8 logos (há ${content.brands.length})`)
  if (content.segments.items[7].id !== 'outras')
    fail(cf, 'o 8º segmento deve ter id "outras" (rota de fuga para contato)')

  const dark = content.productLines.items.filter((l) => l.dark).length
  if (dark !== 1) fail(cf, `exatamente 1 card de produto deve ser dark=true (há ${dark})`)

  const iconNames = new Set(
    Object.keys(
      (
        await import(
          pathToFileURL(join(ROOT, 'node_modules', '.cache', 'lp-check', 'icons.mjs')).href
        )
      ).iconPaths,
    ),
  )
  const iconsUsed = [
    ...content.hero.points.map((p) => p.icon),
    ...content.supportPanel.items.map((p) => p.icon),
    ...content.segments.items.map((p) => p.icon),
    ...content.why.reasons.map((p) => p.icon),
    ...content.quote.trust.map((p) => p.icon),
  ]
  for (const i of iconsUsed) if (!iconNames.has(i)) fail(cf, `ícone "${i}" não existe em icons.ts`)

  const long = (label, s, max) => {
    if (s.length > max)
      warn(cf, `${label} com ${s.length} caracteres (ideal ≤ ${max}): "${s.slice(0, 40)}…"`)
  }
  for (const sec of ['productLines', 'supportPanel', 'applications', 'segments', 'quote'])
    long(`${sec}.text`, content[sec].text, 170)
  for (const l of content.productLines.items) long(`linha "${l.id}".description`, l.description, 90)
  for (const a of content.applications.items)
    long(`aplicação "${a.id}".description`, a.description, 90)
  for (const r of content.why.reasons)
    long(`diferencial "${r.title}".description`, r.description, 70)
} catch (e) {
  fail(join(SRC, 'data'), `não foi possível avaliar site.ts/content.ts: ${e.message}`)
}

/* -------------------------------------------------------------- resultado */
for (const w of warnings) console.log(`⚠  ${w}`)
for (const e of errors) console.log(`✖  ${e}`)
console.log(`\ncheck:lp — ${errors.length} erro(s), ${warnings.length} aviso(s)`)
process.exit(errors.length ? 1 : 0)
