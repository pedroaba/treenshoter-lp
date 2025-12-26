import NextImage from 'next/image'
import { ImageResponse } from 'next/og'

import OpengraphImage from '@/assets/opengraph.png'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  return new ImageResponse(
    // ImageResponse JSX element
    <NextImage
      src={OpengraphImage}
      alt="Opengraph Image"
      width={1200}
      height={630}
    />,
  )
}
