import { Check, ChevronDown, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import type { Platform } from '@/constants/downloads'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Separator } from '../ui/separator'

type DownloadCardProps = {
  platform: Platform
  variant?: 'simple' | 'detailed'
}

export async function DownloadCard({
  platform,
  variant = 'simple',
}: DownloadCardProps) {
  const t = await getTranslations('download')

  const Icon = platform.icon
  const platformName = t(`${platform.key}`)
  const isDetailed = variant === 'detailed'

  return (
    <Card key={platform.key} className="relative flex h-full flex-col">
      <CardHeader className="space-y-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>

        <div className="flex items-center gap-2">
          <CardTitle>{platformName}</CardTitle>

          {isDetailed && platform.available && (
            <Badge className="gap-1">
              <Check className="h-3 w-3" />
              {t('available')}
            </Badge>
          )}

          {!platform.available && (
            <Badge variant="secondary">{t('comingSoon')}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        {isDetailed ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('versionLabel')}</span>
              <span className="font-medium">{platform.version}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('sizeLabel')}</span>
              <span className="font-medium">{platform.size}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t('requirementsLabel')}
              </span>
              <span className="max-w-[60%] text-right font-medium">
                {t(`requirements.${platform.key}`)}
              </span>
            </div>
          </div>
        ) : (
          <CardDescription>
            {t('version', { version: '1.0.0' })}
          </CardDescription>
        )}

        <div className="mt-auto space-y-4 pt-4">
          {isDetailed && <Separator />}

          <CardFooter className="p-0">
            {platform.available ? (
              platform.downloads.length === 1 ? (
                // Single download option - use API
                isDetailed ? (
                  <Link
                    href={`/api/download/${platform.key}?type=${platform.downloads[0].id}`}
                    className="flex w-full items-center justify-center"
                  >
                    <Button className="w-full">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      {t('downloadButton', { platform: platformName })}
                    </Button>
                  </Link>
                ) : (
                  <Link href="/download" className="w-full">
                    <Button className="w-full">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      {t('downloadButton', { platform: platformName })}
                    </Button>
                  </Link>
                )
              ) : // Multiple download options - dropdown menu
              isDetailed ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-full">
                      <DownloadIcon className="mr-2 h-4 w-4" />
                      {t('downloadButton', { platform: platformName })}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {platform.downloads.map((download, index) => (
                      <div key={download.id}>
                        {index > 0 && <DropdownMenuSeparator />}
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/api/download/${platform.key}?type=${download.id}`}
                            className="flex flex-col items-start cursor-pointer"
                          >
                            <div className="flex items-center gap-2 w-full">
                              <span className="font-medium">
                                {download.name}
                              </span>
                              {download.recommended && (
                                <Badge variant="secondary" className="text-xs">
                                  {t('recommended')}
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {download.description}
                            </span>
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/download" className="w-full">
                  <Button className="w-full">
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    {t('downloadButton', { platform: platformName })}
                  </Button>
                </Link>
              )
            ) : (
              <Button className="w-full" disabled>
                <DownloadIcon className="h-4 w-4" />
                {t('comingSoon')}
              </Button>
            )}
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  )
}
