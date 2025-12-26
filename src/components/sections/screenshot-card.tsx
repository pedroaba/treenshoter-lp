'use client'

import { RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { useImageZoom } from '@/hooks/use-image-zoom'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

export type Screenshot = {
  id: number
  alt: string
  placeholder: string
  image: StaticImageData
}

type ScreenshotCardProps = {
  screenshot: Screenshot
}

export function ScreenshotCard({ screenshot }: ScreenshotCardProps) {
  const t = useTranslations('screenshots')
  const [isOpen, setIsOpen] = useState(false)
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)

  const {
    scale,
    translateX,
    translateY,
    isZoomed,
    isDragging,
    zoomIn,
    zoomOut,
    reset,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleDoubleClick,
    constrainPan,
  } = useImageZoom()

  useEffect(() => {
    if (isOpen && imageWrapperRef.current) {
      const img = imageWrapperRef.current.querySelector('img')
      if (img) {
        const updateDimensions = () => {
          setImgDimensions({
            width: img.naturalWidth || img.clientWidth,
            height: img.naturalHeight || img.clientHeight,
          })
        }

        if (img.complete) {
          updateDimensions()
        } else {
          img.onload = updateDimensions
        }
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && containerRef.current && imgDimensions.width > 0) {
      const container = containerRef.current
      constrainPan(
        imgDimensions.width,
        imgDimensions.height,
        container.clientWidth,
        container.clientHeight,
      )
    }
  }, [scale, imgDimensions, constrainPan, isOpen])

  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault()
        zoomIn()
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault()
        zoomOut()
      } else if (e.key === '0') {
        e.preventDefault()
        reset()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, zoomIn, zoomOut, reset])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card
          key={screenshot.id}
          className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <CardContent className="p-0">
            <div
              className={cn(
                'aspect-video w-full',
                screenshot.placeholder,
                'flex items-center justify-center',
              )}
            >
              <Image
                src={screenshot.image}
                alt={screenshot.alt}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent
        className="p-0 max-w-[95vw] md:min-w-2xl max-h-[95vh] w-auto h-auto overflow-hidden bg-transparent border-none shadow-none"
        showCloseButton={false}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center bg-black/80 backdrop-blur-sm"
          style={{ minHeight: '300px', minWidth: '300px' }}
        >
          <div
            ref={imageWrapperRef}
            className="relative transition-transform duration-200 ease-out"
            style={{
              transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
              transformOrigin: 'center center',
              cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'default',
            }}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Image
              src={screenshot.image}
              alt={screenshot.alt}
              width={1000}
              height={1000}
              className="max-w-full md:max-w-2xl max-h-[90vh] object-contain select-none"
              draggable={false}
              style={{ display: 'block' }}
            />
          </div>

          {/* Controles de zoom */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-50">
            <Button
              variant="secondary"
              size="icon"
              onClick={zoomIn}
              disabled={scale >= 5}
              className="bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg transition-all hover:scale-110"
              title={t('zoomIn')}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={zoomOut}
              disabled={scale <= 1}
              className="bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg transition-all hover:scale-110"
              title={t('zoomOut')}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            {isZoomed && (
              <Button
                variant="secondary"
                size="icon"
                onClick={reset}
                className="bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg transition-all hover:scale-110"
                title={t('resetZoom')}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Botão de fechar customizado */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm hover:bg-background shadow-lg z-50 transition-all hover:scale-110"
            title={t('close')}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Indicador de zoom */}
          {isZoomed && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-lg z-50">
              {Math.round(scale * 100)}%
            </div>
          )}

          {/* Dica de uso */}
          {!isZoomed && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg text-xs text-muted-foreground shadow-lg z-50 text-center max-w-xs animate-in fade-in duration-300">
              <p className="hidden sm:block">{t('zoomHint')}</p>
              <p className="sm:hidden">{t('zoomHintMobile')}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
