import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'

export async function ThankYouLinks() {
  const t = await getTranslations('download.thankYou.usefulLinks')

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('title')}</h3>
      <div className="flex flex-col gap-2">
        <Link href="/download#installation">
          <Button variant="outline" className="w-full justify-start" asChild>
            <span className="flex items-center gap-2">
              {t('installation')}
              <ExternalLink className="h-4 w-4" />
            </span>
          </Button>
        </Link>
        <Link href="/about">
          <Button variant="outline" className="w-full justify-start" asChild>
            <span className="flex items-center gap-2">
              {t('documentation')}
              <ExternalLink className="h-4 w-4" />
            </span>
          </Button>
        </Link>
        <Link href="/about">
          <Button variant="outline" className="w-full justify-start" asChild>
            <span className="flex items-center gap-2">
              {t('support')}
              <ExternalLink className="h-4 w-4" />
            </span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
