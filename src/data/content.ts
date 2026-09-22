/**
 * TODO O COPY DA PÁGINA VIVE AQUI.
 *
 * Os componentes em src/components só leem estes objetos. A entrevista do
 * PROMPT-PADRAO-LP preenche este arquivo; o cliente revisa este arquivo.
 * Os tipos abaixo travam as quantidades do padrão (3 pontos no hero, 6 dados,
 * 4 aplicações, 8 segmentos, 5 diferenciais, 3 selos): `npm run check` acusa
 * se faltar ou sobrar item.
 *
 * Conteúdo atual = exemplo de referência (LP Pioneira Rolamentos) com imagens
 * placeholder. Substitua tudo.
 */
import type { ImageMetadata } from 'astro'
import type { IconName } from './icons'
import { site } from './site'

import heroBg from '../assets/heroBg.png'
import linha1 from '../assets/products/linha-1.png'
import linha2 from '../assets/products/linha-2.png'
import linha3 from '../assets/products/linha-3.png'
import marcasPhoto from '../assets/products/marcas.png'
import app1 from '../assets/applications/aplicacao-1.png'
import app2 from '../assets/applications/aplicacao-2.png'
import app3 from '../assets/applications/aplicacao-3.png'
import app4 from '../assets/applications/aplicacao-4.png'
import seg1 from '../assets/segmentos/segmento-1.png'
import seg2 from '../assets/segmentos/segmento-2.png'
import seg3 from '../assets/segmentos/segmento-3.png'
import seg4 from '../assets/segmentos/segmento-4.png'
import seg5 from '../assets/segmentos/segmento-5.png'
import seg6 from '../assets/segmentos/segmento-6.png'
import seg7 from '../assets/segmentos/segmento-7.png'
import seg8 from '../assets/segmentos/segmento-8.png'
import marca1 from '../assets/brands/marca-1.webp'
import marca2 from '../assets/brands/marca-2.webp'
import marca3 from '../assets/brands/marca-3.webp'
import marca4 from '../assets/brands/marca-4.webp'
import marca5 from '../assets/brands/marca-5.webp'
import marca6 from '../assets/brands/marca-6.webp'
import cenario from '../assets/cenario.jpg'
import pessoa from '../assets/pessoa.png'

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

/** Vocabulário fixo de CTA (PROMPT-PADRAO-LP, item 8). Não variar. */
export const cta = {
  primary: 'Solicite sua cotação',
  primaryShort: 'Cotação',
  secondary: 'Identifique seu produto',
  card: 'Falar com especialista',
  whatsapp: 'Chamar no WhatsApp',
} as const

/* ------------------------------------------------------------------ header */

export const header = {
  tagline: site.product,
} as const

/* -------------------------------------------------------------------- hero */

export const hero = {
  eyebrow: 'Manutenção Industrial',
  title: `${site.product} para ${site.context}`,
  text: 'Soluções para diferentes aplicações industriais, com apoio na identificação, especificação e cotação.',
  banner: {
    src: heroBg,
    alt: 'Produto industrial em destaque sobre fundo técnico',
  },
  points: [
    { icon: 'shield', line1: 'Produtos para', line2: 'aplicações industriais' },
    { icon: 'gear', line1: 'Marca A, Marca B', line2: 'e Marca C' },
    { icon: 'truck', line1: 'Atendimento B2B', line2: 'para manutenção' },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  banner: Photo
  points: readonly [HeroPoint, HeroPoint, HeroPoint]
}

/* ------------------------------------------------------------------ marcas */

export const brands = [
  { name: 'Marca 1', src: marca1 },
  { name: 'Marca 2', src: marca2 },
  { name: 'Marca 3', src: marca3 },
  { name: 'Marca 4', src: marca4 },
  { name: 'Marca 5', src: marca5 },
  { name: 'Marca 6', src: marca6 },
] as const satisfies readonly Brand[]

/* -------------------------------------------------------- linhas de produto */

export const productLines = {
  eyebrow: 'Linhas de produto',
  title: 'Linhas de produto',
  text: 'Soluções para diferentes aplicações industriais, com as principais marcas do mercado.',
  items: [
    {
      id: 'linha-1',
      tag: 'Linha 1',
      title: 'Linha de produto 1',
      description: 'Para equipamentos de alta rotação e operação contínua.',
      photo: { src: linha1, alt: 'Produto da linha 1' },
      features: ['Alta rotação', 'Baixo atrito', 'Diversas aplicações'],
      dark: false,
    },
    {
      id: 'linha-2',
      tag: 'Linha 2',
      title: 'Linha de produto 2',
      description: 'Indicada para cargas elevadas e condições operacionais severas.',
      photo: { src: linha2, alt: 'Produto da linha 2' },
      features: ['Altas cargas', 'Maior robustez', 'Aplicações severas'],
      dark: false,
    },
    {
      id: 'linha-3',
      tag: 'Linha 3',
      title: 'Linha de produto 3',
      description: 'Soluções para necessidades que exigem configurações específicas.',
      photo: { src: linha3, alt: 'Produto da linha 3' },
      features: ['Soluções sob medida', 'Ambientes extremos', 'Aplicações específicas'],
      dark: false,
    },
    {
      id: 'marcas',
      tag: 'Marcas',
      title: 'Produtos por marca',
      description: 'Marca A, Marca B, Marca C e outras com pronta disponibilidade.',
      photo: { src: marcasPhoto, alt: 'Caixas de produto das principais marcas' },
      features: ['As principais marcas', 'Disponibilidade imediata', 'Suporte na especificação'],
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

/* --------------------------------------------------------- painel de apoio */

export const supportPanel = {
  eyebrow: 'Apoio na identificação',
  title: 'Precisa identificar um produto?',
  text: 'Não precisa ter todos os dados em mãos. Envie o que você tiver e nossa equipe identifica o modelo correto para a sua aplicação.',
  microcopy: 'Retorno com apoio técnico especializado',
  items: [
    { icon: 'barcode', label: 'Referência', hint: 'ou código gravado' },
    { icon: 'tag', label: 'Marca', hint: 'do fabricante' },
    { icon: 'camera', label: 'Foto', hint: 'do produto' },
    { icon: 'ruler', label: 'Medidas', hint: 'diâmetro e largura' },
    { icon: 'factory', label: 'Equipamento', hint: 'onde é aplicado' },
    { icon: 'target', label: 'Aplicação', hint: 'carga e rotação' },
  ],
} as const satisfies {
  eyebrow: string
  title: string
  text: string
  microcopy: string
  items: readonly [SupportItem, SupportItem, SupportItem, SupportItem, SupportItem, SupportItem]
}

/* -------------------------------------------------------------- aplicações */

export const applications = {
  eyebrow: 'Aplicações',
  title: 'Produtos para diferentes aplicações industriais',
  text: 'Componentes destinados à manutenção e reposição em máquinas e equipamentos utilizados em diferentes processos industriais.',
  items: [
    {
      id: 'motores',
      label: 'Motores Elétricos',
      description: 'Aplicações em motores e conjuntos rotativos.',
      photo: { src: app1, alt: 'Motor elétrico industrial' },
    },
    {
      id: 'bombas',
      label: 'Bombas',
      description: 'Aplicações em bombas e sistemas industriais.',
      photo: { src: app2, alt: 'Bomba centrífuga industrial' },
    },
    {
      id: 'redutores',
      label: 'Redutores',
      description: 'Sistemas de transmissão e redução.',
      photo: { src: app3, alt: 'Redutor de velocidade industrial' },
    },
    {
      id: 'transportadores',
      label: 'Transportadores',
      description: 'Sistemas de movimentação e transporte industrial.',
      photo: { src: app4, alt: 'Esteira transportadora de rolos' },
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
  title: 'Soluções para manutenção industrial',
  text: 'Produtos e apoio técnico para diferentes processos produtivos.',
  items: [
    {
      id: 'alimenticia',
      icon: 'utensils',
      label: 'Indústria Alimentícia',
      description:
        'Linhas de processamento e envase que exigem funcionamento contínuo, higiene e resistência à lavagem.',
      bullets: [
        'Linhas de envase e embalagem',
        'Esteiras e transportadores',
        'Misturadores e moinhos',
      ],
      photo: { src: seg1, alt: 'Linha de envase automatizada da indústria alimentícia' },
    },
    {
      id: 'ceramica',
      icon: 'disc',
      label: 'Cerâmica',
      description:
        'Equipamentos de preparação de massa, prensagem e secagem, expostos a poeira abrasiva e altas temperaturas.',
      bullets: ['Prensas e extrusoras', 'Moinhos e misturadores', 'Fornos e secadores'],
      photo: { src: seg2, alt: 'Linha de produção de peças cerâmicas' },
    },
    {
      id: 'usinagem',
      icon: 'settings-2',
      label: 'Usinagem',
      description:
        'Máquinas-ferramenta e centros de usinagem, onde rigidez e baixa vibração definem a qualidade da peça.',
      bullets: ['Fusos e cabeçotes', 'Tornos e centros de usinagem', 'Retíficas e fresadoras'],
      photo: { src: seg3, alt: 'Centro de usinagem CNC em operação' },
    },
    {
      id: 'mineracao',
      icon: 'mountain',
      label: 'Mineração',
      description:
        'Cargas elevadas, impacto e contaminação em britadores, peneiras e transportadores de longa distância.',
      bullets: ['Britadores e peneiras', 'Transportadores de correia', 'Moinhos e bombas de polpa'],
      photo: { src: seg4, alt: 'Equipamentos de mineração em operação a céu aberto' },
    },
    {
      id: 'papel-celulose',
      icon: 'file-text',
      label: 'Papel e Celulose',
      description:
        'Máquinas de papel, refinadores e secadores, em ambientes úmidos e com operação ininterrupta.',
      bullets: ['Máquinas de papel', 'Refinadores e desagregadores', 'Secadores e calandras'],
      photo: { src: seg5, alt: 'Máquina de papel com bobinas em fábrica de celulose' },
    },
    {
      id: 'siderurgia',
      icon: 'flame',
      label: 'Siderurgia',
      description:
        'Laminadores, lingotamento e fornos, dimensionados para altas temperaturas e cargas extremas.',
      bullets: ['Laminadores e cadeiras', 'Lingotamento contínuo', 'Pontes rolantes e fornos'],
      photo: { src: seg6, alt: 'Laminação de aço incandescente em siderúrgica' },
    },
    {
      id: 'automacao',
      icon: 'cpu',
      label: 'Automação Industrial',
      description:
        'Sistemas automatizados, robótica e movimentação, com foco em precisão e baixa manutenção.',
      bullets: [
        'Esteiras e sistemas de movimentação',
        'Robôs e manipuladores',
        'Motorredutores e acionamentos',
      ],
      photo: { src: seg7, alt: 'Robôs industriais em célula automatizada' },
    },
    {
      id: 'outras',
      icon: 'more-horizontal',
      label: 'Outras Aplicações Industriais',
      description:
        'Não encontrou o seu segmento? Atendemos diferentes processos industriais com apoio técnico na identificação e especificação.',
      bullets: ['Apoio na identificação', 'Múltiplas marcas e soluções', 'Atendimento B2B'],
      photo: { src: seg8, alt: 'Planta industrial com diferentes equipamentos e aplicações' },
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
  titleLines: ['Seu equipamento', 'não pode parar.'],
  text: `Mais que produtos, parceria para a sua operação. Conte com a ${site.brandShort} para identificar, especificar e fornecer o componente correto, com atendimento B2B e foco em manter a sua indústria em movimento.`,
  scene: { src: cenario, alt: 'Produtos industriais e instrumentos sobre bancada de manutenção' },
  person: {
    src: pessoa,
    alt: `Técnico da ${site.brandShort} de braços cruzados`,
  },
  reasons: [
    {
      icon: 'search',
      title: 'Apoio na identificação',
      description: 'Encontre o produto certo com apoio técnico.',
    },
    {
      icon: 'sliders',
      title: 'Orientação de especificação',
      description: 'A melhor solução para a sua aplicação.',
    },
    {
      icon: 'layers',
      title: 'Múltiplas marcas e soluções',
      description: 'As principais marcas e soluções do mercado.',
    },
    {
      icon: 'users',
      title: 'Atendimento B2B especializado',
      description: 'Foco em empresas e equipes de manutenção.',
    },
    {
      icon: 'wrench',
      title: 'Solução para manutenção',
      description: 'Mais disponibilidade e menos paradas.',
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
  title: `Fale com quem entende de ${site.product.toLowerCase()}.`,
  text: 'Nossa equipe está pronta para identificar, especificar e cotar o produto certo para a sua aplicação. Preencha o formulário ou fale direto conosco pelo WhatsApp.',
  trust: [
    { icon: 'clock', label: 'Resposta rápida' },
    { icon: 'shield', label: 'Apoio técnico especializado' },
    { icon: 'map-pin', label: 'Atendimento em todo o Brasil' },
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
