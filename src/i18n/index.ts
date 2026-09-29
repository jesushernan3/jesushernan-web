import es from './locales/es.json';
import en from './locales/en.json';
import pt from './locales/pt.json';

export const locales = ['es', 'en', 'pt'] as const;
export type Locale = typeof locales[number];
export const pages = ['home', 'app', 'ebook', 'course', 'contact'] as const;
export type Page = typeof pages[number];
export const languageNames: Record<Locale, string> = { es: 'Español', en: 'English', pt: 'Português' };
export const dictionaries: Record<Locale, typeof es> = { es, en, pt };

export const slugs: Record<Locale, Record<Page, string>> = {
  es: { home: '', app: 'app', ebook: 'ebook', course: 'curso', contact: 'contacto' },
  en: { home: '', app: 'app', ebook: 'ebook', course: 'course', contact: 'contact' },
  pt: { home: '', app: 'app', ebook: 'ebook', course: 'curso', contact: 'contato' },
};

export function getLocale(pathname: string): Locale {
  const prefix = pathname.split('/').filter(Boolean)[0];
  return prefix === 'en' || prefix === 'pt' ? prefix : 'es';
}

export function pageUrl(locale: Locale, page: Page): string {
  const segments = [locale === 'es' ? '' : locale, slugs[locale][page]].filter(Boolean);
  return segments.length ? `/${segments.join('/')}/` : '/';
}

export function getPage(pathname: string): Page {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const locale = getLocale(pathname);
  const page = pages.find(page => (pageUrl(locale, page).replace(/\/+$/, '') || '/') === normalized);
  if (!page) throw new Error(`Unknown localized page: ${pathname}`);
  return page;
}

export function getI18n(pathname: string) {
  const locale = getLocale(pathname);
  return { locale, t: dictionaries[locale], page: getPage(pathname) };
}
