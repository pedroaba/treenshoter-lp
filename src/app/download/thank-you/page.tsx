import { CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { DownloadHandler } from '@/components/download-handler'
import { ThankYouFAQ } from '@/components/thank-you-faq'
import { ThankYouLinks } from '@/components/thank-you-links'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SITE_NAME, SITE_URL } from '@/constants/seo'
import { LocaleUtils } from '@/i18n/get-locale'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('download.thankYou')
  const locale = await LocaleUtils.get()
  const title = t('title')
  const ogImage = `${SITE_URL}/og-image.png`

  return {
    title,
    description: t('message'),
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: `${SITE_URL}/download/thank-you`,
      siteName: SITE_NAME,
      title,
      description: t('message'),
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
      description: t('message'),
      images: [ogImage],
    },
    alternates: {
      canonical: '/download/thank-you',
      languages: {
        'pt-BR': '/pt/download/thank-you',
        'en-US': '/en/download/thank-you',
        'x-default': '/download/thank-you',
      },
    },
  }
}

export default async function ThankYouPage() {
  const t = await getTranslations('download.thankYou')

  return (
    <div className="container px-4 py-16 md:py-24 mx-auto">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('message')}
          </p>
        </div>

        {/* Main Content - Two Columns Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Download</CardTitle>
                <CardDescription>
                  Seu download deve começar automaticamente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DownloadHandler />
              </CardContent>
            </Card>

            <Separator className="lg:hidden" />

            {/* FAQ Section */}
            <Card>
              <CardContent>
                <ThankYouFAQ />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Useful Links */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent>
                <ThankYouLinks />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
