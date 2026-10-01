export const languages = { en: 'English', es: 'Español' } as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

const en = {
  'site.description':
    'Daniel Guzman is an engineer from Lima, Peru, who builds learning products with AI.',
  'site.ogImageAlt': 'Daniel Guzman, an engineer from Lima, Peru. I build things that teach.',
  'nav.label': 'Main',
  'nav.home': 'home',
  'nav.projects': 'projects',
  'nav.writing': 'writing',
  'nav.about': 'about',
  'site.notFoundTitle': 'Page not found — Daniel Guzman',
  'lang.label': 'Language',
  'footer.made': 'made in lima',
  'social.label': 'Social links',
  'home.tagline': 'I build things that teach.',
  'home.location': '~/lima, peru',
  'home.building': 'currently building',
  'home.teaching': 'learning design',
  'home.alsoBuilt': 'also built',
  'status.inProgress': 'In progress',
  'notFound.code': '404',
  'notFound.title': 'Page not found',
  'notFound.body': "This page doesn't exist, or it isn't built yet.",
  'notFound.home': '← back home',
  'status.building': 'building…',
  'status.thinking': 'thinking…',
  'status.testing': 'testing…',
  'status.pivoting': 'pivoting…',
} as const;

export type UiKey = keyof typeof en;

const es: Record<UiKey, string> = {
  'site.description':
    'Daniel Guzman es un ingeniero de Lima, Perú, que construye productos de aprendizaje con IA.',
  'site.ogImageAlt': 'Daniel Guzman, ingeniero de Lima, Perú. Construyo cosas que enseñan.',
  'nav.label': 'Principal',
  'nav.home': 'inicio',
  'nav.projects': 'proyectos',
  'nav.writing': 'escritos',
  'nav.about': 'sobre mí',
  'site.notFoundTitle': 'Página no encontrada — Daniel Guzman',
  'lang.label': 'Idioma',
  'footer.made': 'hecho en lima',
  'social.label': 'Redes',
  'home.tagline': 'Construyo cosas que enseñan.',
  'home.location': '~/lima, perú',
  'home.building': 'construyendo ahora',
  'home.teaching': 'diseño de aprendizaje',
  'home.alsoBuilt': 'también construí',
  'status.inProgress': 'En progreso',
  'notFound.code': '404',
  'notFound.title': 'Página no encontrada',
  'notFound.body': 'Esta página no existe, o todavía no está construida.',
  'notFound.home': '← volver al inicio',
  'status.building': 'construyendo…',
  'status.thinking': 'pensando…',
  'status.testing': 'probando…',
  'status.pivoting': 'pivoteando…',
};

export const ui: Record<Lang, Record<UiKey, string>> = { en, es };
