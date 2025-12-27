import { DownloadIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { DownloadCard } from '@/components/sections/download-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { type Platform, platforms } from '@/constants/downloads'
import { SITE_NAME, SITE_URL } from '@/constants/seo'
import { LocaleUtils } from '@/i18n/get-locale'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('download')
  const locale = await LocaleUtils.get()
  const title = t('title')
  const description = t('subtitle')
  const ogImage = `${SITE_URL}/og-image.png`

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: `${SITE_URL}/download`,
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
    },
    alternates: {
      canonical: '/download',
      languages: {
        'pt-BR': '/pt/download',
        'en-US': '/en/download',
        'x-default': '/download',
      },
    },
  }
}

export default async function DownloadPage() {
  const t = await getTranslations('download')

  return (
    <div className="container px-4 py-16 md:py-24 mx-auto">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {platforms.map((platform: Platform) => (
            <DownloadCard
              key={platform.key}
              platform={platform}
              variant="detailed"
            />
          ))}
        </div>

        <Separator className="my-12" />

        <div className="space-y-6">
          {platforms.map((platform: Platform) => {
            if (platform.downloads.length <= 1) {
              return null
            }

            return (
              <Card key={platform.key}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <platform.icon className="h-6 w-6" />
                    <CardTitle>{t(platform.key)}</CardTitle>
                  </div>
                  <CardDescription>
                    {t('multipleOptionsDescription', {
                      platform: t(platform.key),
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {platform.downloads.map((download) => (
                      <div
                        key={download.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{download.name}</span>
                            {download.recommended && (
                              <Badge variant="secondary" className="text-xs">
                                {t('recommended')}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {download.description}
                          </p>
                        </div>
                        <Link
                          href={`/api/download/${platform.key}?type=${download.id}`}
                        >
                          <Button size="icon" className="ml-4">
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Separator className="my-12" />

        <Card>
          <CardHeader>
            <CardTitle>{t('installationInstructions.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">
                {t('installationInstructions.macos.title')}
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index}>
                    {t(`installationInstructions.macos.steps.${index + 1}`)}
                  </li>
                ))}
              </ol>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">
                {t('installationInstructions.windows.title')}
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index}>
                    {t(`installationInstructions.windows.steps.${index + 1}`)}
                  </li>
                ))}
              </ol>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">
                {t('installationInstructions.linux.title')}
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                {Array.from({ length: 5 }).map((_, index) => (
                  <li key={index}>
                    {t(`installationInstructions.linux.steps.${index + 1}`)}
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
