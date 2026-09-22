/**
 * Dados globais da LP. Tudo que aparece em mais de um lugar (head, header, footer,
 * JSON-LD) vem daqui. Preenchido pela entrevista do PROMPT-PADRAO-LP (entradas 1, 3, 4, 14, 15, 18).
 */
export const site = {
  /** Nome completo da empresa (entrada 1). */
  brand: 'Vazão Engenharia e Montagem',
  /** Nome curto usado em frases como "Por que a …" (entrada 2). */
  brandShort: 'Vazão',
  /** Produto principal, no plural (entrada 3). Vai na tagline do header e no H1. */
  product: 'Serviços de Adequação NR13',
  /** Contexto de uso (entrada 4). Completa o H1 e o title. */
  context: 'adequação e gestão da NR13',
  /**
   * URL absoluta da página no ar (entrada 15). PENDÊNCIA: cliente respondeu "ainda não sei" na
   * entrevista — domínio herdado do material de origem (vazao.com.br). Confirmar antes do publish.
   */
  url: 'https://www.vazao.com.br/lp/adequacao-nr13',
  /** Endereço completo com CEP (entrada 14). Footer e JSON-LD. */
  address: 'Av. Barão de Bonito, 880 - Brasilit, Recife - PE, 50740-080',
  /** Link da política de privacidade do cliente. Vazio esconde o link, mas a nota de LGPD continua. */
  privacyUrl: '',
  /** Versão do padrão B2 que esta LP segue. Não editar manualmente; vem do template. */
  standardVersion: '1.0.0',
} as const

/** Título da aba. Versão curta do produto (a fórmula padrão "{Produto} para {contexto}" passava de 70 caracteres). */
export const title = `Adequação NR13 | ${site.brand}`

/** Meta description (≤ 160 caracteres). Ajuste o texto, mantendo marcas e o apoio técnico. */
export const description =
  'Adequação NR13 para vasos de pressão, caldeiras e tubulações. Levantamento, laudo técnico, projeto e execução com apoio de engenharia especializada.'

/** Número do WhatsApp comercial no formato internacional, só dígitos (ex.: 5511999999999). Vazio desativa o botão flutuante. */
export const whatsapp = ''
