'use server'

import Link from 'next/link'
import type { Locale } from 'next-intl'

import { LocaleUtils } from '@/i18n/get-locale'

import { DesktopNavigationMenu } from './desktop-navigation-menu'
import { LanguageChanger } from './language-changer'
import { MobileNavigationMenu } from './mobile-navigation-menu'
import { ThemeToggle } from './toggle-theme'

export async function Header() {
  async function handleChangeLocale(locale: Locale) {
    'use server'

    await LocaleUtils.set(locale)
  }

  return (
    <header className="sticky top-0 z-50 flex justify-center items-center w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container h-16 px-4 grid grid-cols-3 items-center">
        <Link
          href="/#hero"
          className="flex items-center space-x-2 font-bold text-xl"
        >
          <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Treenshoter
          </span>
        </Link>

        <DesktopNavigationMenu />

        <div className="flex items-center gap-2 justify-end">
          <LanguageChanger onLocaleChange={handleChangeLocale} />
          <ThemeToggle />

          <MobileNavigationMenu />
        </div>
      </div>
    </header>
  )
}
