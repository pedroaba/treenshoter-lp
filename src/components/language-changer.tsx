'use client'

import { Globe } from 'lucide-react'
import { type Locale, useLocale, useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

type LanguageChangerProps = {
  onLocaleChange: (locale: Locale) => Promise<void>
}

export function LanguageChanger({ onLocaleChange }: LanguageChangerProps) {
  const t = useTranslations('common')
  const tLanguages = useTranslations('languages')
  const locale = useLocale()

  function handleChangeLocale(locale: Locale) {
    onLocaleChange(locale)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer"
          aria-label={t('language')}
        >
          <Globe className="size-4" />
          <span className="text-xs uppercase">{locale}</span>
          <span className="sr-only">{t('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-1">
        <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => handleChangeLocale('pt')}
          className={cn(locale === 'pt' && 'bg-accent')}
        >
          <span className="text-xs uppercase">{tLanguages('pt')}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleChangeLocale('en' as Locale)}
          className={cn(locale === 'en' && 'bg-accent')}
        >
          <span className="text-xs uppercase">{tLanguages('en')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
