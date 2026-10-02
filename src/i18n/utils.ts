import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLang, languages, ui, type Lang, type UiKey } from './ui';

export const langs = Object.keys(languages) as Lang[];

export function getLang(locale: string | undefined): Lang {
  return langs.find((lang) => lang === locale) ?? defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key];
}

export function stripLang(path: string) {
  for (const lang of langs) {
    if (path === `/${lang}` || path === `/${lang}/`) {
      return '/';
    }
    if (path.startsWith(`/${lang}/`)) {
      return path.slice(lang.length + 1);
    }
  }
  return path;
}

export function localizePath(path: string, lang: Lang) {
  return getRelativeLocaleUrl(lang, stripLang(path));
}
