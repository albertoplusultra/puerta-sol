import { ui, type UiKey } from "./ui";
import {
  DEFAULT_LOCALE,
  LOCALES,
  ACTIVE_LOCALES,
  HREFLANG,
  LOCALE_LABELS,
} from "../config/site.mjs";

export type Locale = "es" | "en" | "fr" | "de" | "it" | "pt";

export const locales = LOCALES as readonly Locale[];
export const activeLocales = ACTIVE_LOCALES as readonly Locale[];
export const defaultLocale = DEFAULT_LOCALE as Locale;

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as string[]).includes(value);
}

/** Devuelve una función de traducción para el idioma dado. */
export function useTranslations(locale: Locale) {
  const dict = ui[locale] ?? ui[defaultLocale];
  return function t(key: UiKey): string {
    return dict[key] ?? ui[defaultLocale][key] ?? key;
  };
}

/**
 * Construye una URL a partir de segmentos, con prefijo de idioma para TODOS
 * los locales (ej. /es/historia/) y trailingSlash.
 */
export function localizedPath(locale: Locale, ...segments: string[]): string {
  const clean = segments
    .filter(Boolean)
    .flatMap((s) => s.split("/"))
    .filter(Boolean);
  const path = [locale, ...clean].join("/");
  return `/${path}/`;
}

export const hreflangFor = (locale: Locale): string => HREFLANG[locale];
export const labelFor = (locale: Locale): string => LOCALE_LABELS[locale];
