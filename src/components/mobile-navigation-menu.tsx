'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import type { MenuItem } from '@/constants/menu'
import { menuItems } from '@/constants/menu'

import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export function MobileNavigationMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const t = useTranslations('nav')

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('toggleMenu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{t('menu')}</SheetTitle>
        </SheetHeader>
        <nav
          className="flex flex-col gap-4 mt-8"
          aria-label="Mobile navigation"
        >
          {menuItems.map((item: MenuItem) => {
            if (item.type === 'anchor') {
              return (
                <Link
                  key={item.key}
                  href={`${item.base}${item.href}`}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t(`${item.key}`)}
                </Link>
              )
            }

            return (
              <Link
                key={item.key}
                href={item.to as any}
                className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(`${item.key}`)}
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
