import { getTranslations } from 'next-intl/server'

import { features } from '@/constants/feature'

import { FeatureCard } from './feature-card'

export async function Features() {
  const t = await getTranslations('features')

  return (
    <section id="features" className="py-20 md:py-32 max-w-4xl mx-auto">
      <div className="relative z-10 w-full px-4">
        <div className="mx-auto text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            return <FeatureCard key={feature.key} feature={feature} />
          })}
        </div>
      </div>
    </section>
  )
}
