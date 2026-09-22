/**
 * Dados globais da LP. Tudo que aparece em mais de um lugar (head, header, footer,
 * JSON-LD) vem daqui. Preenchido pela entrevista do PROMPT-PADRAO-LP (entradas 1, 3, 4, 14, 15, 18).
 */
export const site = {
  /** Nome completo da empresa (entrada 1). */
  brand: 'Empresa Exemplo',
  /** Nome curto usado em frases como "Por que a …" (entrada 2). */
  brandShort: 'Exemplo',
  /** Produto principal, no plural (entrada 3). Vai na tagline do header e no H1. */
  product: 'Produtos industriais',
  /** Contexto de uso (entrada 4). Completa o H1 e o title. */
  context: 'manutenção e reposição',
  /** URL absoluta da página no ar (entrada 15). Usada em canonical e og:url. */
  url: 'https://www.exemplo.com.br/lp/produtos-industriais',
  /** Endereço completo com CEP (entrada 14). Footer e JSON-LD. */
  address: 'Rua Exemplo, 100 - Centro, Cidade - UF, 00000-000',
  /** Link da política de privacidade do cliente. Vazio esconde o link, mas a nota de LGPD continua. */
  privacyUrl: '',
  /** Versão do padrão B2 que esta LP segue. Não editar manualmente; vem do template. */
  standardVersion: '1.0.0',
} as const

/** Título da aba: "{Produto} para {contexto} | {Marca}". */
export const title = `${site.product} para ${site.context} | ${site.brand}`

/** Meta description (≤ 160 caracteres). Ajuste o texto, mantendo marcas e o apoio técnico. */
export const description =
  'Solicite cotação de produtos industriais das principais marcas. Apoio técnico na identificação e especificação para manutenção industrial.'

/** Número do WhatsApp comercial no formato internacional, só dígitos (ex.: 5511999999999). Vazio desativa o botão flutuante. */
export const whatsapp = ''
