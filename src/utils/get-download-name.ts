export enum DownloadType {
  DMG = 'dmg',
  ZIP = 'zip',
  EXE = 'exe',
  APPIMAGE = 'appimage',
  DEB = 'deb',
  RPM = 'rpm',
  PACMAN = 'pacman',
  FREEBSD = 'freebsd',
}

const specialCases = {
  [DownloadType.ZIP]: '-arm64-mac.zip',
  [DownloadType.EXE]: '-setup.exe',
  [DownloadType.APPIMAGE]: '.AppImage',
  [DownloadType.DEB]: '_amd64.deb',
  [DownloadType.RPM]: '.x86_64.rpm',
  [DownloadType.PACMAN]: '.pacman',
  [DownloadType.FREEBSD]: '.freebsd',
  [DownloadType.DMG]: '.dmg',
}

export function getDownloadName(version: string, type: DownloadType) {
  const extension = specialCases[type]
  let appname = 'treenshoter'
  if (type === DownloadType.ZIP) {
    appname = 'Treenshoter'
  }

  let separator = '-'
  if (type === DownloadType.DEB) {
    separator = '_'
  }

  return `${appname}${separator}${version}${extension}`
}
