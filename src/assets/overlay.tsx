import Image, { type ImageProps } from 'next/image'

import OverlayScreenshotPNG from './screenshots/overlay.png'

type OverlayScreenshotProps = Omit<ImageProps, 'src' | 'alt'>

export async function OverlayScreenshot(props: OverlayScreenshotProps) {
  return (
    <Image
      src={OverlayScreenshotPNG}
      alt="Overlay Screenshot"
      width={1000}
      height={1000}
      {...props}
    />
  )
}
