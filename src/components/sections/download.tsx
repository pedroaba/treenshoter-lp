import { getTranslations } from 'next-intl/server'

import type { Platform } from '@/constants/downloads'
import { platforms } from '@/constants/downloads'

import { DownloadCard } from './download-card'

export async function Download() {
  const t = await getTranslations('download')

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 mx-auto">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {platforms.map((platform: Platform) => {
            return <DownloadCard key={platform.key} platform={platform} />
          })}
        </div>
      </div>
    </section>
  )
}
