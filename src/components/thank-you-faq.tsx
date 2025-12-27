import { getTranslations } from 'next-intl/server'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export async function ThankYouFAQ() {
  const t = await getTranslations('download.thankYou.faq')

  const faqItems = [
    'installation',
    'free',
    'requirements',
    'verify',
    'help',
  ] as const

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('title')}</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item) => (
          <AccordionItem key={item} value={item}>
            <AccordionTrigger value={item}>
              {t(`items.${item}.question`)}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">
                {t(`items.${item}.answer`)}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
