import { ui, type Lang, type UiKey } from './ui';

export function useTranslations(lang: Lang) {
  return (key: UiKey) => ui[lang][key];
}
