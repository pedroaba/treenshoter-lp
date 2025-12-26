import { Code, ExternalLink, FileText, Github, User } from 'lucide-react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SITE_NAME, SITE_URL } from '@/constants/seo'
import { technologies, type Technology } from '@/constants/technologies'
import { LocaleUtils } from '@/i18n/get-locale'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about')
  const locale = await LocaleUtils.get()
  const title = t('title')
  const description = t('description')
  const ogImage = `${SITE_URL}/og-image.png`

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: `${SITE_URL}/about`,
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
      canonical: '/about',
      languages: {
        'pt-BR': '/pt/about',
        'en-US': '/en/about',
        'x-default': '/about',
      },
    },
  }
}

export default async function AboutPage() {
  const t = await getTranslations('about')
  return (
    <div className="container px-4 py-16 md:py-24 mx-auto">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground">{t('description')}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>{t('tech')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech: Technology) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>{t('author')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                <a
                  href="https://github.com/pedroaba"
                  target="_blank"
                  rel="canonical"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  pedroaba
                </a>
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>{t('license')}</CardTitle>

                <a
                  href="https://github.com/pedroaba/treenshoter/blob/main/LICENSE"
                  target="_blank"
                  rel="canonical"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {t('copyright', { year: new Date().getFullYear() })}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
