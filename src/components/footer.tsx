import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

import { Separator } from '@/components/ui/separator'
import type { MenuItem } from '@/constants/menu'
import { menuItems } from '@/constants/menu'

export async function Footer() {
  const tFooter = await getTranslations('footer')
  const tAbout = await getTranslations('about')

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background w-full">
      <div className="py-12 md:py-16 w-full">
        <div className="grid gap-8 md:grid-cols-4 max-w-7xl mx-auto px-10">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Treenshoter</h3>
            <p className="text-sm text-muted-foreground">
              {tFooter('description') as string}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Links</h4>
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item: MenuItem) => {
                if (item.type === 'anchor') {
                  return (
                    <Link
                      key={item.key}
                      href={`${item.base}${item.href}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {tFooter(`links.${item.key}`)}
                    </Link>
                  )
                }

                return (
                  <Link
                    key={item.key}
                    href={item.to as any}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tFooter(`links.${item.key}`)}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{tAbout('tech')}</h4>
            <div className="text-sm text-muted-foreground flex flex-col gap-2">
              <a
                href="https://www.electronjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors inline-block"
              >
                Electron
              </a>
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors inline-block"
              >
                React
              </a>
              <a
                href="https://www.typescriptlang.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors inline-block"
              >
                TypeScript
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{tAbout('author')}</h4>
            <div className="flex flex-col gap-1">
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <FaLinkedin className="size-4 text-blue-500" />
                <a
                  href="https://linkedin.com/in/pedroaba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  @pedroaba
                </a>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <FaGithub className="size-4 text-black" />
                <a
                  href="https://linkedin.com/in/pedroaba"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-block"
                >
                  @pedroaba
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 w-full" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground max-w-7xl mx-auto px-10">
          <p>{tFooter('copyright', { year: currentYear })}</p>
          <div className="flex items-center gap-1">
            <FaGithub className="size-4 text-black" />
            <a
              href="https://github.com/pedroaba/treenshoter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
