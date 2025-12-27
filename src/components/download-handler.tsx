'use client'

import { DownloadIcon, ExternalLink } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export function DownloadHandler() {
  const searchParams = useSearchParams()
  const t = useTranslations('download.thankYou')
  const [showManualDownload, setShowManualDownload] = useState(false)
  const [isDownloading, setIsDownloading] = useState(true)

  const downloadUrl = searchParams.get('url')
  const filename = searchParams.get('filename') || 'treenshoter'

  useEffect(() => {
    if (!downloadUrl) {
      return
    }

    // Inicia o download automaticamente
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Esconde o spinner após 2 segundos
    const hideSpinnerTimer = setTimeout(() => {
      setIsDownloading(false)
    }, 2000)

    // Após 5 segundos, mostra o link de download manual
    const showManualTimer = setTimeout(() => {
      setShowManualDownload(true)
    }, 5000)

    return () => {
      clearTimeout(hideSpinnerTimer)
      clearTimeout(showManualTimer)
    }
  }, [downloadUrl, filename])

  const handleManualDownload = () => {
    if (!downloadUrl) return

    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!downloadUrl) {
    return null
  }

  return (
    <div className="space-y-4">
      {/* Status do download */}
      {isDownloading && (
        <>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>{t('downloading')}</span>
          </div>
          <Separator />
        </>
      )}

      {/* Link direto sempre visível */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{t('message')}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={handleManualDownload} size="lg" className="flex-1">
            <DownloadIcon className="mr-2 h-4 w-4" />
            {t('manualDownload')}
          </Button>
          <Button variant="outline" size="lg" asChild className="flex-1">
            <a
              href={downloadUrl}
              download={filename}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              {t('directLink')}
            </a>
          </Button>
        </div>
      </div>

      {/* Mensagem adicional após 5 segundos */}
      {showManualDownload && (
        <>
          <Separator />
          <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            <p>
              O download não iniciou automaticamente? Use os botões acima para
              baixar manualmente ou abrir o link direto.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
