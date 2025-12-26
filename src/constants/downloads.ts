import { FaWindows } from 'react-icons/fa'
import { FaLinux } from 'react-icons/fa6'
import { ImAppleinc } from 'react-icons/im'

export const PlatformIcons = {
  macos: ImAppleinc,
  windows: FaWindows,
  linux: FaLinux,
} as const

const BASE_RELEASE_URL =
  'https://github.com/pedroaba/treenshoter/releases/download/v1.0.0'

export type DownloadOption = {
  id: string
  name: string
  description: string
  url: string
  recommended?: boolean
}

export type Platform = {
  key: 'macos' | 'windows' | 'linux'
  icon: (typeof PlatformIcons)[keyof typeof PlatformIcons]
  available: boolean
  version: string
  size: string
  requirements: string
  downloads: Array<DownloadOption>
}

export const platforms: Array<Platform> = [
  {
    key: 'macos',
    icon: PlatformIcons.macos,
    available: true,
    version: '1.0.0',
    size: '~50 MB',
    requirements: 'macOS 10.15 ou superior',
    downloads: [
      {
        id: 'dmg',
        name: 'DMG',
        description: 'Instalador padrão',
        url: `${BASE_RELEASE_URL}/treenshoter-1.0.0.dmg`,
        recommended: true,
      },
      {
        id: 'zip',
        name: 'ZIP',
        description: 'Arquivo ZIP (arm64)',
        url: `${BASE_RELEASE_URL}/Treenshoter-1.0.0-arm64-mac.zip`,
      },
    ],
  },
  {
    key: 'windows',
    icon: PlatformIcons.windows,
    available: true,
    version: '1.0.0',
    size: '~50 MB',
    requirements: 'Windows 10 ou superior',
    downloads: [
      {
        id: 'exe',
        name: 'EXE',
        description: 'Instalador Windows',
        url: `${BASE_RELEASE_URL}/treenshoter-1.0.0-setup.exe`,
        recommended: true,
      },
    ],
  },
  {
    key: 'linux',
    icon: PlatformIcons.linux,
    available: true,
    version: '1.0.0',
    size: '~50 MB',
    requirements: 'Linux (múltiplas distribuições)',
    downloads: [
      {
        id: 'appimage',
        name: 'AppImage',
        description: 'Universal (recomendado)',
        url: `${BASE_RELEASE_URL}/treenshoter-1.0.0.AppImage`,
        recommended: true,
      },
      {
        id: 'deb',
        name: 'DEB',
        description: 'Debian/Ubuntu',
        url: `${BASE_RELEASE_URL}/treenshoter_1.0.0_amd64.deb`,
      },
      {
        id: 'rpm',
        name: 'RPM',
        description: 'Red Hat/Fedora',
        url: `${BASE_RELEASE_URL}/treenshoter-1.0.0.x86_64.rpm`,
      },
      {
        id: 'pacman',
        name: 'PACMAN',
        description: 'Arch Linux',
        url: `${BASE_RELEASE_URL}/treenshoter-1.0.0.pacman`,
      },
      {
        id: 'freebsd',
        name: 'FreeBSD',
        description: 'FreeBSD',
        url: `${BASE_RELEASE_URL}/treenshoter-1.0.0.freebsd`,
      },
    ],
  },
] as const
