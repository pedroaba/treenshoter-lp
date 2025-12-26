import { useCallback, useEffect, useRef, useState } from 'react'

const MIN_ZOOM = 1
const MAX_ZOOM = 5
const ZOOM_STEP = 0.25

interface UseImageZoomReturn {
  scale: number
  translateX: number
  translateY: number
  isZoomed: boolean
  isDragging: boolean
  zoomIn: () => void
  zoomOut: () => void
  reset: () => void
  handleWheel: (e: React.WheelEvent) => void
  handleMouseDown: (e: React.MouseEvent) => void
  handleMouseMove: (e: React.MouseEvent) => void
  handleMouseUp: () => void
  handleTouchStart: (e: React.TouchEvent) => void
  handleTouchMove: (e: React.TouchEvent) => void
  handleTouchEnd: () => void
  handleDoubleClick: () => void
  constrainPan: (
    imgWidth: number,
    imgHeight: number,
    containerWidth: number,
    containerHeight: number,
  ) => void
}

export function useImageZoom(): UseImageZoomReturn {
  const [scale, setScale] = useState(1)
  const [translateX, setTranslateX] = useState(0)
  const [translateY, setTranslateY] = useState(0)
  const [isPanning, setIsPanning] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(
    null,
  )
  const [lastTouchCenter, setLastTouchCenter] = useState<{
    x: number
    y: number
  } | null>(null)
  const touchStartScale = useRef(1)
  const touchStartTranslate = useRef({ x: 0, y: 0 })

  const isZoomed = scale > 1

  const constrainPan = useCallback(
    (
      imgWidth: number,
      imgHeight: number,
      containerWidth: number,
      containerHeight: number,
    ) => {
      if (scale <= 1) {
        setTranslateX(0)
        setTranslateY(0)
        return
      }

      const scaledWidth = imgWidth * scale
      const scaledHeight = imgHeight * scale

      const maxTranslateX = (scaledWidth - containerWidth) / 2
      const maxTranslateY = (scaledHeight - containerHeight) / 2

      setTranslateX((prev) => {
        const constrained = Math.max(
          -maxTranslateX,
          Math.min(maxTranslateX, prev),
        )
        return constrained
      })

      setTranslateY((prev) => {
        const constrained = Math.max(
          -maxTranslateY,
          Math.min(maxTranslateY, prev),
        )
        return constrained
      })
    },
    [scale],
  )

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM))
  }, [])

  const zoomOut = useCallback(() => {
    setScale((prev) => {
      const newScale = Math.max(prev - ZOOM_STEP, MIN_ZOOM)
      if (newScale <= 1) {
        setTranslateX(0)
        setTranslateY(0)
      }
      return newScale
    })
  }, [])

  const reset = useCallback(() => {
    setScale(1)
    setTranslateX(0)
    setTranslateY(0)
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return

    e.preventDefault()

    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
    setScale((prev) => {
      const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev + delta))
      if (newScale <= 1) {
        setTranslateX(0)
        setTranslateY(0)
      }
      return newScale
    })
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isZoomed && e.button === 0) {
        e.preventDefault()
        setIsDragging(true)
        setPanStart({ x: e.clientX - translateX, y: e.clientY - translateY })
      }
    },
    [isZoomed, translateX, translateY],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging && isZoomed) {
        const newX = e.clientX - panStart.x
        const newY = e.clientY - panStart.y
        setTranslateX(newX)
        setTranslateY(newY)
      }
    },
    [isDragging, isZoomed, panStart],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const getTouchDistance = (touch1: Touch, touch2: Touch): number => {
    const dx = touch2.clientX - touch1.clientX
    const dy = touch2.clientY - touch1.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const getTouchCenter = (
    touch1: Touch,
    touch2: Touch,
  ): { x: number; y: number } => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    }
  }

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        setIsPanning(true)
        setPanStart({
          x: e.touches[0].clientX - translateX,
          y: e.touches[0].clientY - translateY,
        })
      } else if (e.touches.length === 2) {
        setIsPanning(false)
        const distance = getTouchDistance(
          e.touches[0] as Touch,
          e.touches[1] as Touch,
        )
        const center = getTouchCenter(
          e.touches[0] as Touch,
          e.touches[1] as Touch,
        )
        setLastTouchDistance(distance)
        setLastTouchCenter(center)
        touchStartScale.current = scale
        touchStartTranslate.current = { x: translateX, y: translateY }
      }
    },
    [scale, translateX, translateY],
  )

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1 && isPanning && isZoomed) {
        const newX = e.touches[0].clientX - panStart.x
        const newY = e.touches[0].clientY - panStart.y
        setTranslateX(newX)
        setTranslateY(newY)
      } else if (
        e.touches.length === 2 &&
        lastTouchDistance &&
        lastTouchCenter
      ) {
        e.preventDefault()
        const distance = getTouchDistance(
          e.touches[0] as Touch,
          e.touches[1] as Touch,
        )
        const center = getTouchCenter(
          e.touches[0] as Touch,
          e.touches[1] as Touch,
        )
        const scaleChange = distance / lastTouchDistance
        const newScale = Math.max(
          MIN_ZOOM,
          Math.min(MAX_ZOOM, touchStartScale.current * scaleChange),
        )

        if (newScale > 1) {
          const deltaX = center.x - lastTouchCenter.x
          const deltaY = center.y - lastTouchCenter.y
          setTranslateX(touchStartTranslate.current.x + deltaX)
          setTranslateY(touchStartTranslate.current.y + deltaY)
        }

        setScale(newScale)
        setLastTouchDistance(distance)
        setLastTouchCenter(center)
      }
    },
    [isPanning, isZoomed, panStart, lastTouchDistance, lastTouchCenter],
  )

  const handleTouchEnd = useCallback(() => {
    setIsPanning(false)
    setLastTouchDistance(null)
    setLastTouchCenter(null)
  }, [])

  const handleDoubleClick = useCallback(() => {
    reset()
  }, [reset])

  useEffect(() => {
    if (scale <= 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- This is a side effect that only needs to run once
      setTranslateX(0)
      setTranslateY(0)
    }
  }, [scale])

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        if (isZoomed) {
          const newX = e.clientX - panStart.x
          const newY = e.clientY - panStart.y
          setTranslateX(newX)
          setTranslateY(newY)
        }
      }

      const handleGlobalMouseUp = () => {
        setIsDragging(false)
      }

      window.addEventListener('mousemove', handleGlobalMouseMove)
      window.addEventListener('mouseup', handleGlobalMouseUp)

      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove)
        window.removeEventListener('mouseup', handleGlobalMouseUp)
      }
    }
  }, [isDragging, isZoomed, panStart])

  return {
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
  }
}
