/**
 * TODO O COPY DA PÁGINA VIVE AQUI.
 *
 * Os componentes em src/components só leem estes objetos. A entrevista do
 * PROMPT-PADRAO-LP preenche este arquivo; o cliente revisa este arquivo.
 * Os tipos abaixo travam as quantidades do padrão (3 pontos no hero, 6 dados,
 * 4 aplicações, 8 segmentos, 5 diferenciais, 3 selos): `npm run check` acusa
 * se faltar ou sobrar item.
 *
 * LP de SERVIÇO INDUSTRIAL (mapa 3.1 do PROMPT-PADRAO-LP): "Linhas de produto" vira
 * "Serviços", "Painel de apoio" vira "Como funciona", "Aplicações" vira "Onde atuamos".
 * Sem carrossel de marcas — nenhum logo de cliente/certificação foi informado no briefing
 * (docs/BRIEFING.md, entrada 6).
 *
 * Fotos ainda são os placeholders do template (mesmo aspect-ratio das seções reais).
 * Substituir pelos arquivos reais quando o cliente anexar (ver docs/BRIEFING.md > Assets).
 */
import type { ImageMetadata } from 'astro'
import type { IconName } from './icons'
import { site } from './site'

import heroBg from '../assets/generated/hero-nr13.png'
import servico1 from '../assets/generated/service-inspection.png'
import servico2 from '../assets/generated/service-design.png'
import servico3 from '../assets/generated/service-execution.png'
import servico4 from '../assets/generated/service-recertification.png'
import app1 from '../assets/generated/application-pressure-vessel.png'
import app2 from '../assets/generated/application-boiler.png'
import app3 from '../assets/generated/application-piping.png'
import app4 from '../assets/generated/application-storage-tanks.png'
import seg1 from '../assets/generated/segment-mining.png'
import seg2 from '../assets/generated/segment-pulp-paper.png'
import seg3 from '../assets/generated/segment-petrochemical.png'
import seg4 from '../assets/generated/segment-food-beverage.png'
import seg5 from '../assets/generated/segment-steel.png'
import seg6 from '../assets/generated/segment-energy.png'
import seg7 from '../assets/generated/segment-healthcare.png'
import seg8 from '../assets/generated/segment-industrial.png'
import cenario from '../assets/generated/why-scene.png'
import pessoa from '../assets/generated/why-engineer.png'

/* ------------------------------------------------------------------ tipos */

export interface Photo {
  src: ImageMetadata
  alt: string
}

export interface HeroPoint {
  icon: IconName
  line1: string
  line2: string
}

export interface ProductLine {
  id: string
  tag: string
  title: string
  description: string
  photo: Photo
  features: readonly [string, string, string]
  /** Exatamente um card escuro por grid, normalmente o de marcas. Informe sempre (true/false). */
  dark: boolean
}

export interface SupportItem {
  icon: IconName
  label: string
  hint: string
}

export interface Application {
  id: string
  label: string
  description: string
  photo: Photo
}

export interface Segment {
  id: string
  icon: IconName
  label: string
  description: string
  bullets: readonly [string, string, string]
  photo?: Photo
}

export interface Reason {
  icon: IconName
  title: string
  description: string
}

export interface TrustItem {
  icon: IconName
  label: string
}

export interface Brand {
  name: string
  src: ImageMetadata
}

/* ----------------------------------------------------------- vocabulário */

/**
 * Vocabulário fixo de CTA (PROMPT-PADRAO-LP, item 8), com a variação do CTA secundário
 * prevista na tabela 3.1 para "serviço industrial" ("Agende uma visita técnica" no lugar
 * de "Identifique seu produto").
 */
export const cta = {
  primary: 'Solicite sua cotação',
  primaryShort: 'Cotação',
  secondary: 'Agende uma visita técnica',
  card: 'Falar com especialista',
  whatsapp: 'Chamar no WhatsApp',
} as const

/**
 * Marcas/clientes (entrada 6). Vazia: nenhum logo de cliente ou certificação foi informado no
 * briefing, então o carrossel foi removido de ProductLines.astro (mapa 3.1, "serviço industrial").
 * Preencher aqui se o cliente enviar logos depois — o componente do carrossel precisaria voltar.
 */
export const brands = [] as const satisfies readonly Brand[]

/* ------------------------------------------------------------------ header */

export const header = {
  tagline: site.product,
} as const

/* -------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: 'Engenharia e Adequação NR13',
  title: 'Adequação NR13 para os equipamentos da sua indústria',
  text: 'Levantamento, laudo técnico, projeto e execução para manter vasos de pressão, caldeiras e tubulações em conformidade com a NR13.',
  banner: {
    src: heroBg,
    alt: 'Equipamento industrial em destaque sobre fundo técnico',
  },
  points: [
    { icon: 'shield', line1: 'Conformidade com', line2: 'a NR13' },
    { icon: 'factory', line1: 'Vasos, caldeiras', line2: 'e tubulações' },
    { icon: 'badge-check', line1: 'Desde 1991 em', line2: 'engenharia industrial' },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  banner: Photo
  points: readonly [HeroPoint, HeroPoint, HeroPoint]
}

/* ------------------------------------------------------------------ serviços */

export const productLines = {
  eyebrow: 'Serviços',
  title: 'Serviços de Adequação NR13',
  text: 'Da identificação dos equipamentos enquadrados até a manutenção da conformidade ao longo do tempo.',
  items: [
    {
      id: 'levantamento-laudo',
      tag: 'Diagnóstico',
      title: 'Levantamento e Laudo Técnico',
      description: 'Diagnóstico completo dos equipamentos e emissão do laudo técnico.',
      photo: { src: servico1, alt: 'Equipamento industrial sendo inspecionado em campo' },
      features: ['Levantamento de campo', 'Laudo técnico', 'Conformidade NR13'],
      dark: false,
    },
    {
      id: 'projeto-adequacao',
      tag: 'Projeto',
      title: 'Projeto de Adequação',
      description: 'Elaboração do projeto técnico para adequar os equipamentos à norma.',
      photo: { src: servico2, alt: 'Projeto técnico de adequação de equipamento industrial' },
      features: ['Projeto técnico', 'Memorial descritivo', 'ART/RRT'],
      dark: false,
    },
    {
      id: 'execucao-adequacao',
      tag: 'Execução',
      title: 'Execução da Adequação',
      description: 'Implantação física dos ajustes identificados no laudo.',
      photo: { src: servico3, alt: 'Execução de ajustes técnicos em equipamento industrial' },
      features: ['Instalação de dispositivos', 'Sinalização', 'Ajustes estruturais'],
      dark: false,
    },
    {
      id: 'acompanhamento-recertificacao',
      tag: 'Contratos',
      title: 'Acompanhamento e Recertificação',
      description: 'Gestão contínua para manter os equipamentos em conformidade.',
      photo: { src: servico4, alt: 'Equipe de engenharia acompanhando manutenção periódica' },
      features: ['PMOC', 'Inspeções periódicas', 'Renovação de laudo'],
      dark: true,
    },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  items:
    | readonly [ProductLine, ProductLine, ProductLine]
    | readonly [ProductLine, ProductLine, ProductLine, ProductLine]
}

/* --------------------------------------------------------- como funciona */

export const supportPanel = {
  eyebrow: 'Como funciona',
  title: 'Como funciona a Adequação NR13?',
  text: 'Um processo estruturado, do diagnóstico em campo até a recertificação, para manter seus equipamentos em conformidade com a norma.',
  microcopy: 'Acompanhamento com apoio técnico especializado',
  items: [
    { icon: 'search', label: 'Levantamento de Campo', hint: 'diagnóstico dos equipamentos' },
    { icon: 'file-text', label: 'Laudo Técnico', hint: 'diagnóstico de conformidade' },
    { icon: 'ruler', label: 'Projeto de Adequação', hint: 'ajustes necessários' },
    { icon: 'wrench', label: 'Execução', hint: 'implantação em campo' },
    { icon: 'clock', label: 'Acompanhamento', hint: 'PMOC e inspeções periódicas' },
    { icon: 'badge-check', label: 'Recertificação', hint: 'renovação dentro do prazo' },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  microcopy: string
  items: readonly [SupportItem, SupportItem, SupportItem, SupportItem, SupportItem, SupportItem]
}

/* -------------------------------------------------------------- onde atuamos */

export const applications = {
  eyebrow: 'Onde atuamos',
  title: 'Equipamentos enquadrados na NR13',
  text: 'Atuação nos principais tipos de equipamento sujeitos à norma, com diagnóstico e adequação sob medida para cada caso.',
  items: [
    {
      id: 'vasos-pressao',
      label: 'Vasos de Pressão',
      description: 'Vasos com fluidos classe A ou produto P·V superior a 8.',
      photo: { src: app1, alt: 'Vaso de pressão industrial vertical' },
    },
    {
      id: 'caldeiras',
      label: 'Caldeiras',
      description: 'Equipamentos enquadrados entre os geradores de vapor da NR13.',
      photo: { src: app2, alt: 'Caldeira industrial em planta fabril' },
    },
    {
      id: 'tubulacoes',
      label: 'Tubulações e Sistemas de Tubulações',
      description: 'Interligadas a caldeiras ou vasos de pressão com fluidos classe A ou B.',
      photo: { src: app3, alt: 'Conjunto de tubulações industriais' },
    },
    {
      id: 'tanques',
      label: 'Tanques de Armazenamento',
      description: 'Tanques listados entre os equipamentos enquadrados na NR13.',
      photo: { src: app4, alt: 'Tanques de armazenamento industrial' },
    },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  items: readonly [Application, Application, Application, Application]
}

/* --------------------------------------------------------------- segmentos */

export const segments = {
  eyebrow: 'Segmentos atendidos',
  title: 'Adequação NR13 para diferentes indústrias',
  text: 'Equipamentos enquadrados na NR13 aparecem em processos produtivos de setores muito diferentes entre si.',
  items: [
    {
      id: 'mineracao',
      icon: 'mountain',
      label: 'Mineração',
      description: 'Vasos de pressão e caldeiras em operações de beneficiamento e britagem.',
      bullets: ['Vasos de pressão', 'Caldeiras de processo', 'Tubulações de polpa'],
      photo: { src: seg1, alt: 'Planta de mineração com equipamentos industriais' },
    },
    {
      id: 'papel-celulose',
      icon: 'file-text',
      label: 'Papel e Celulose',
      description: 'Caldeiras e vasos de pressão em ambientes úmidos e de operação contínua.',
      bullets: ['Caldeiras de recuperação', 'Vasos de pressão', 'Tubulações de vapor'],
      photo: { src: seg2, alt: 'Fábrica de papel e celulose com caldeiras' },
    },
    {
      id: 'quimica-petroquimica',
      icon: 'droplet',
      label: 'Química e Petroquímica',
      description: 'Vasos com fluidos classe A e sistemas de tubulações de alta exigência.',
      bullets: ['Vasos com fluidos classe A', 'Tubulações de processo', 'Tanques de armazenamento'],
      photo: { src: seg3, alt: 'Planta química com vasos de pressão e tubulações' },
    },
    {
      id: 'alimentos-bebidas',
      icon: 'utensils',
      label: 'Alimentos e Bebidas',
      description: 'Caldeiras e vasos de pressão em linhas de processamento e envase.',
      bullets: ['Caldeiras de processo', 'Vasos de pressão', 'Tubulações de vapor'],
      photo: { src: seg4, alt: 'Linha de processamento de alimentos com caldeiras' },
    },
    {
      id: 'siderurgia-metalurgia',
      icon: 'flame',
      label: 'Siderurgia e Metalurgia',
      description: 'Equipamentos sob altas temperaturas e cargas extremas de operação.',
      bullets: ['Caldeiras e fornos', 'Vasos de pressão', 'Tubulações de processo'],
      photo: { src: seg5, alt: 'Siderúrgica com caldeiras e vasos de pressão' },
    },
    {
      id: 'geracao-energia',
      icon: 'zap',
      label: 'Geração de Energia',
      description: 'Caldeiras e vasos de pressão em usinas e termelétricas.',
      bullets: ['Caldeiras de geração', 'Vasos de pressão', 'Tubulações de alta pressão'],
      photo: { src: seg6, alt: 'Usina de geração de energia com caldeiras' },
    },
    {
      id: 'hospitais-clinicas',
      icon: 'cylinder',
      label: 'Hospitais e Clínicas',
      description: 'Autoclaves e vasos de pressão usados em esterilização.',
      bullets: ['Autoclaves', 'Vasos de pressão', 'Tubulações de vapor'],
      photo: { src: seg7, alt: 'Autoclave hospitalar em central de esterilização' },
    },
    {
      id: 'outras',
      icon: 'more-horizontal',
      label: 'Outras Aplicações Industriais',
      description:
        'Não encontrou o seu segmento? Atendemos diferentes indústrias com equipamentos enquadrados na NR13.',
      bullets: [
        'Diagnóstico gratuito',
        'Engenharia multidisciplinar',
        'Atendimento em todo o Brasil',
      ],
      photo: {
        src: seg8,
        alt: 'Planta industrial com diferentes equipamentos enquadrados na NR13',
      },
    },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  items: readonly [Segment, Segment, Segment, Segment, Segment, Segment, Segment, Segment]
}

/* ------------------------------------------------------------ diferenciais */

export const why = {
  eyebrow: `Por que a ${site.brandShort}`,
  /** Cada item é uma linha do H2 (quebra forçada). 3–6 palavras no total. */
  titleLines: ['Segurança e conformidade', 'com a NR13.'],
  text: `Mais que um laudo, parceria para manter sua operação segura e em conformidade. Conte com a ${site.brandShort} para levantar, projetar, executar e acompanhar a adequação dos seus equipamentos à NR13.`,
  scene: { src: cenario, alt: 'Equipamentos e instrumentos técnicos de inspeção industrial' },
  person: {
    src: pessoa,
    alt: `Engenheiro da ${site.brandShort} de braços cruzados`,
  },
  reasons: [
    {
      icon: 'shield',
      title: 'Especialização em NR13',
      description: 'Atuação especializada em Adequação NR13.',
    },
    {
      icon: 'layers',
      title: 'Experiência desde 1991',
      description: 'Mais de três décadas em engenharia industrial.',
    },
    {
      icon: 'gear',
      title: 'Engenharia multidisciplinar',
      description: 'Experiência em engenharia mecânica, civil e elétrica.',
    },
    {
      icon: 'file-text',
      title: 'Documentação técnica completa',
      description: 'Laudo e documentação prontos para fiscalização e auditorias.',
    },
    {
      icon: 'zap',
      title: 'Atendimento ágil',
      description: 'Equipe pronta para agir dentro do prazo combinado.',
    },
  ],
} as const satisfies {
  eyebrow: string
  titleLines: readonly string[]
  text: string
  scene: Photo
  person: Photo
  reasons: readonly [Reason, Reason, Reason, Reason, Reason]
}

/* ----------------------------------------------------------------- cotação */

export const quote = {
  eyebrow: 'Solicite sua cotação',
  title: `Fale com quem entende de ${site.product.replace('Serviços', 'serviços')}.`,
  text: 'Nossa equipe está pronta para levantar, projetar e executar a adequação dos seus equipamentos à NR13. Preencha o formulário ou fale direto conosco pelo WhatsApp.',
  trust: [
    { icon: 'shield', label: 'Especialistas em Adequação NR13' },
    { icon: 'clock', label: 'Fundada em 1991' },
    { icon: 'gear', label: 'Engenharia mecânica, civil e elétrica' },
  ],
  /** Nota de LGPD exibida abaixo do formulário. */
  lgpd: `Seus dados são usados apenas para responder à sua solicitação de cotação, conforme a LGPD.`,
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  trust: readonly [TrustItem, TrustItem, TrustItem]
  lgpd: string
}

/* ------------------------------------------------------------------ footer */

export const footer = {
  credit: { label: 'B2 Marketing Industrial', url: 'https://b2marketingindustrial.com.br' },
} as const
