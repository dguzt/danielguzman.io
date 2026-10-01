import type { UiKey } from '@/i18n/ui';

export const author = 'Daniel Guzman';

export const navItems: { key: UiKey; href: string }[] = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.projects', href: '/projects' },
  { key: 'nav.writing', href: '/writing' },
  { key: 'nav.about', href: '/about' },
];

export const socialLinks = [
  { label: 'github', href: 'https://github.com/dguzt' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/daniel-guzman-t/' },
];
