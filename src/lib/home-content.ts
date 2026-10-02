import type { Lang } from '@/i18n/ui';

interface HomeContent {
  currentProject: { title: string; summary: string; href: string };
  learningDesign: { title: string; summary: string; href: string; label: string };
  otherBuilds: { label: string; href: string }[];
}

const otherBuilds = [
  { label: 'cocapital', href: '/projects/cocapital' },
  { label: 'tributo', href: '/projects' },
];

export const homeContent: Record<Lang, HomeContent> = {
  en: {
    currentProject: {
      title: 'Admitidos',
      summary:
        'For students in Peru getting into university. Right now: an admissions results portal.',
      href: '/projects/admitidos',
    },
    learningDesign: {
      title: 'From workshop to self-paced manual',
      summary:
        'Not everyone learned at the same pace, so I turned an AI workshop into a self-paced manual, answered questions along the way, and built a tool to produce those manuals.',
      href: '/projects/makerlab',
      label: 'makerlab',
    },
    otherBuilds,
  },
  es: {
    currentProject: {
      title: 'Admitidos',
      summary:
        'Para estudiantes que postulan a la universidad en Perú. Ahora mismo: un portal de resultados de admisión.',
      href: '/projects/admitidos',
    },
    learningDesign: {
      title: 'Del taller al manual autoguiado',
      summary:
        'No todos aprendían al mismo ritmo, así que convertí un taller de IA en un manual autoguiado, resolví dudas en el camino y construí una herramienta para producir esos manuales.',
      href: '/projects/makerlab',
      label: 'makerlab',
    },
    otherBuilds,
  },
};
