import { getTranslations } from 'next-intl/server'

import type { Feature } from '@/constants/feature'

import { Badge } from '../ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

type FeatureCardProps = {
  feature: Feature
}

export async function FeatureCard({ feature }: FeatureCardProps) {
  const t = await getTranslations('features')

  const Icon = feature.icon
  const isComingSoon = feature.isComingSoon ?? false

  return (
    <Card
      key={feature.key}
      className="group relative hover:shadow-lg transition-shadow"
    >
      <CardHeader>
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        {isComingSoon && (
          <Badge variant="secondary" className="absolute top-6 right-6">
            {t('comingSoon')}
          </Badge>
        )}
        <CardTitle>{t(`${feature.key}.title`)}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {t(`${feature.key}.description`)}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
