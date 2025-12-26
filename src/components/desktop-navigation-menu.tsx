import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import type { MenuItem } from '@/constants/menu'
import { menuItems } from '@/constants/menu'

export async function DesktopNavigationMenu() {
  const t = await getTranslations('nav')

  return (
    <nav
      className="hidden md:flex items-center gap-6 justify-center"
      aria-label="Main navigation"
    >
      {menuItems.map((item: MenuItem) => {
        if (item.type === 'anchor') {
          return (
            <Link
              key={item.key}
              href={`${item.base}${item.href}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(`${item.key}`)}
            </Link>
          )
        }

        return (
          <Link
            key={item.key}
            href={item.to as any}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t(`${item.key}`)}
          </Link>
        )
      })}
    </nav>
  )
}
