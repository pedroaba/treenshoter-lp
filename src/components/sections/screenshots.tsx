import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import LibraryScreenshotPNG from '@/assets/screenshots/library.png'
import OverlayScreenshotPNG from '@/assets/screenshots/overlay.png'
import PreviewScreenshotPNG from '@/assets/screenshots/preview.png'

import { Screenshot, ScreenshotCard } from './screenshot-card'

export async function Screenshots() {
  const t = await getTranslations('screenshots')

  const screenshots = [
    {
      id: 1,
      alt: 'Screenshot 1',
      placeholder: 'bg-gradient-to-br from-primary/20 to-primary/5',
      image: LibraryScreenshotPNG,
    },
    {
      id: 2,
      alt: 'Screenshot 2',
      placeholder: 'bg-gradient-to-br from-muted to-muted/50',
      image: OverlayScreenshotPNG,
    },
    {
      id: 3,
      alt: 'Screenshot 3',
      placeholder: 'bg-gradient-to-br from-primary/10 to-muted/30',
      image: PreviewScreenshotPNG,
    },
  ] as const

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((screenshot: Screenshot) => (
            <Suspense key={screenshot.id}>
              <ScreenshotCard key={screenshot.id} screenshot={screenshot} />
            </Suspense>
          ))}
        </div>
      </div>
    </section>
  )
}
