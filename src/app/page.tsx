import { Download } from '@/components/sections/download'
import { Features } from '@/components/sections/features'
import { Hero } from '@/components/sections/hero'
import { Screenshots } from '@/components/sections/screenshots'

export default async function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Screenshots />
      <Download />
    </>
  )
}
