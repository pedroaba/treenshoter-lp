import Image, { type ImageProps } from 'next/image'

import PreviewScreenshotPNG from './screenshots/preview.png'

type PreviewScreenshotProps = Omit<ImageProps, 'src' | 'alt'>

export async function PreviewScreenshot(props: PreviewScreenshotProps) {
  return (
    <Image
      src={PreviewScreenshotPNG}
      alt="Preview Screenshot"
      width={1000}
      height={1000}
      {...props}
    />
  )
}
