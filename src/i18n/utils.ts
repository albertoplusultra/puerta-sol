import { ui, type UiKey } from "./ui";
import {
  DEFAULT_LOCALE,
  LOCALES,
  HREFLANG,
  LOCALE_LABELS,
} from "../config/site.mjs";

export type Locale = "es" | "en" | "fr" | "de" | "it" | "pt";

export const locales = LOCALES as readonly Locale[];
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
 * Construye una URL absoluta-relativa a partir de segmentos, respetando el
 * prefijo de idioma (el idioma por defecto vive en la raíz) y trailingSlash.
 */
export function localizedPath(locale: Locale, ...segments: string[]): string {
  const clean = segments
    .filter(Boolean)
    .flatMap((s) => s.split("/"))
    .filter(Boolean);
  const prefix = locale === defaultLocale ? [] : [locale];
  const path = [...prefix, ...clean].join("/");
  return path ? `/${path}/` : "/";
}

export const hreflangFor = (locale: Locale): string => HREFLANG[locale];
export const labelFor = (locale: Locale): string => LOCALE_LABELS[locale];
