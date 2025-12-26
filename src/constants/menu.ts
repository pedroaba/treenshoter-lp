export const menuItems = [
  { key: 'home', type: 'link', to: '/' },
  { key: 'features', type: 'anchor', href: '#features', base: '/' },
  { key: 'about', type: 'link', to: '/about' },
  { key: 'download', type: 'link', to: '/download' },
]

export type MenuItem = (typeof menuItems)[number]
