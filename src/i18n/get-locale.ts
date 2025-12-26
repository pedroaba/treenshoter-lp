import { cookies } from 'next/headers'
import type { Locale as LocaleType } from 'next-intl'

import { Locale } from '@/constants/locale'

export class LocaleUtils {
  static async get() {
    const nextCookies = await cookies()

    return nextCookies.get(Locale.cookieName)?.value || Locale.default
  }

  static async set(locale: LocaleType) {
    const nextCookies = await cookies()

    nextCookies.set(Locale.cookieName, locale)
  }
}
