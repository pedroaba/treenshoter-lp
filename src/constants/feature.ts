import { Crop, Library, Monitor, PenTool, Sparkles, Zap } from 'lucide-react'

export const FeatureIcons = {
  instantCapture: Zap,
  regionSelection: Crop,
  organizedLibrary: Library,
  annotations: PenTool,
  crossPlatform: Monitor,
  minimalist: Sparkles,
} as const

export const features = [
  {
    key: 'instantCapture' as const,
    icon: FeatureIcons.instantCapture,
  },
  {
    key: 'regionSelection' as const,
    icon: FeatureIcons.regionSelection,
  },
  {
    key: 'organizedLibrary' as const,
    icon: FeatureIcons.organizedLibrary,
  },
  {
    key: 'annotations' as const,
    icon: FeatureIcons.annotations,
    // isComingSoon: true,
  },
  {
    key: 'crossPlatform' as const,
    icon: FeatureIcons.crossPlatform,
  },
  {
    key: 'minimalist' as const,
    icon: FeatureIcons.minimalist,
  },
] as const

export type Feature = (typeof features)[number] & {
  isComingSoon?: boolean
}
