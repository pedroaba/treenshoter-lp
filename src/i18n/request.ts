import { getRequestConfig } from 'next-intl/server'

import { LocaleUtils } from './get-locale'

export default getRequestConfig(async () => {
  const locale = await LocaleUtils.get()

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
