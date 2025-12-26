import './globals.css'

import type { Metadata, ResolvingMetadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { SITE_NAME, SITE_URL } from '@/constants/seo'
import { ThemeProvider } from '@/context/theme'
import { LocaleUtils } from '@/i18n/get-locale'

export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const t = await getTranslations('metadata')
  const locale = await LocaleUtils.get()
  const title = t('title')
  const description = t('description')
  const ogImage = `${SITE_URL}/og-image.png`

  return {
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    applicationName: SITE_NAME,
    category: 'software',
    authors: [
      {
        name: 'Pedro Augusto Barbosa Aparecido',
        url: 'https://pedroaba.com.br',
      },
    ],
    creator: 'Pedro Augusto Barbosa Aparecido',
    publisher: 'Pedro Augusto Barbosa Aparecido',
    keywords: [
      'screenshot',
      'screen capture',
      'screenshot app',
      'electron',
      'treenshoter',
      'screenshot application',
      'free screen capture',
      'captura de tela',
      'aplicativo de screenshot',
    ],
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: '/',
      languages: {
        'pt-BR': '/pt',
        'en-US': '/en',
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: SITE_URL,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@pedroaba',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Adicione suas chaves de verificação aqui quando disponíveis
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 w-full" id="hero">
                {children}
              </main>
              <Footer />
            </div>

            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
