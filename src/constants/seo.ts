import type { Locale } from 'next-intl'

export const SITE_URL = 'https://treenshoter-website.vercel.app'
export const SITE_NAME = 'Treenshoter'
export const SITE_DESCRIPTION = {
  pt: 'Aplicativo minimalista para captura, gerenciamento e organização de screenshots. Disponível para macOS, Windows e Linux.',
  en: 'Minimalist app for screenshot capture, management and organization. Available for macOS, Windows and Linux.',
}
export const SITE_AUTHOR = 'pedroaba'
export const SITE_KEYWORDS = {
  pt: 'screenshot, captura de tela, screen capture, screenshot app, electron, treenshoter, aplicativo de screenshot',
  en: 'screenshot, screen capture, screenshot app, electron, treenshoter, screenshot application',
}

export interface SEOConfig {
  title: string
  description: string
  keywords: string
  path: string
  image?: string
}

export const SEO_CONFIG: Record<string, Record<Locale, SEOConfig>> = {
  home: {
    pt: {
      title: 'Treenshoter - Capture, gerencie e organize suas screenshots',
      description:
        'Aplicativo minimalista e poderoso para captura instantânea de tela, com biblioteca organizada e ferramentas de anotação.',
      keywords:
        'screenshot, captura de tela, screen capture, screenshot app, electron, treenshoter, aplicativo de screenshot, captura de tela gratuita',
      path: '/',
      image: `${SITE_URL}/og-image.png`,
    },
    en: {
      title: 'Treenshoter - Capture, manage and organize your screenshots',
      description:
        'Minimalist and powerful app for instant screen capture, with organized library and annotation tools.',
      keywords:
        'screenshot, screen capture, screenshot app, electron, treenshoter, screenshot application, free screen capture',
      path: '/',
      image: `${SITE_URL}/og-image.png`,
    },
  },
  about: {
    pt: {
      title: 'Sobre o Treenshoter - Tecnologias e Informações',
      description:
        'Treenshoter é um aplicativo minimalista desenvolvido com Electron para capturar, gerenciar e organizar screenshots de forma eficiente. Focado na produtividade e simplicidade.',
      keywords:
        'sobre treenshoter, tecnologias, electron, aplicativo screenshot, desenvolvedor, pedroaba',
      path: '/about',
      image: `${SITE_URL}/og-image.png`,
    },
    en: {
      title: 'About Treenshoter - Technologies and Information',
      description:
        'Treenshoter is a minimalist application developed with Electron to capture, manage and organize screenshots efficiently. Focused on productivity and simplicity.',
      keywords:
        'about treenshoter, technologies, electron, screenshot app, developer, pedroaba',
      path: '/about',
      image: `${SITE_URL}/og-image.png`,
    },
  },
  download: {
    pt: {
      title: 'Baixar Treenshoter - macOS, Windows e Linux',
      description:
        'Baixe o Treenshoter para sua plataforma. Disponível para macOS, Windows e Linux. Instruções de instalação incluídas.',
      keywords:
        'baixar treenshoter, download treenshoter, instalar treenshoter, macos, windows, linux, screenshot app download',
      path: '/download',
      image: `${SITE_URL}/og-image.png`,
    },
    en: {
      title: 'Download Treenshoter - macOS, Windows and Linux',
      description:
        'Download Treenshoter for your platform. Available for macOS, Windows and Linux. Installation instructions included.',
      keywords:
        'download treenshoter, install treenshoter, macos, windows, linux, screenshot app download',
      path: '/download',
      image: `${SITE_URL}/og-image.png`,
    },
  },
}

export const getSEOConfig = (
  route: string,
  locale: Locale = 'pt',
): SEOConfig => {
  return SEO_CONFIG[route][locale]
}
