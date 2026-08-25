export interface NavItem {
  id: string
  label: string
  href: string
}

export const navigationItems: NavItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'sparklearn', label: 'SPARKlearn', href: '#sparklearn' },
  { id: 'team', label: 'Team', href: '#team' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]
