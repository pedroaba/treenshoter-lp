import Image, { type ImageProps } from 'next/image'

import LibraryScreenshotPNG from './screenshots/library.png'

type LibraryScreenshotProps = Omit<ImageProps, 'src' | 'alt'>

export async function LibraryScreenshot(props: LibraryScreenshotProps) {
  return (
    <Image
      src={LibraryScreenshotPNG}
      alt="Library Screenshot"
      width={1000}
      height={1000}
      {...props}
    />
  )
}
