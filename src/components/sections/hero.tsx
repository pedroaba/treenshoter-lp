import { ArrowRight, Download } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'

export async function Hero() {
  const t = await getTranslations('hero')

  return (
    <section className="relative w-screen max-w-none overflow-hidden border-b bg-linear-to-b from-background to-muted/20 py-20 md:py-32">
      <div className="relative z-10 w-full px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h1>

          <p className="mb-10 text-lg text-muted-foreground sm:text-xl md:text-2xl">
            {t('subtitle')}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/download" className="">
              <Button className="group cursor-pointer">
                <Download className="mr-2 h-5 w-5" />
                {t('cta')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button asChild variant="outline" size="lg">
              <Link href="#features">{t('ctaSecondary')}</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
    </section>
  )
}
