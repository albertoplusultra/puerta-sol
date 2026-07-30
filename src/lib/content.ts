import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "../i18n/utils";
import { locales } from "../i18n/utils";

export type Article = CollectionEntry<"articles">;

let _cache: Article[] | null = null;

async function all(): Promise<Article[]> {
  if (!_cache) {
    _cache = await getCollection("articles");
  }
  return _cache;
}

export async function getArticlesByLocale(locale: Locale): Promise<Article[]> {
  const entries = await all();
  return entries
    .filter((e) => e.data.lang === locale)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getArticle(
  locale: Locale,
  slug: string
): Promise<Article | undefined> {
  const entries = await all();
  return entries.find((e) => e.data.lang === locale && e.data.slug === slug);
}

export async function getPillar(locale: Locale): Promise<Article | undefined> {
  const entries = await getArticlesByLocale(locale);
  return entries.find((e) => e.data.category === "guide");
}

/**
 * Devuelve, para un translationKey dado, un mapa locale -> slug.
 * Base para construir las etiquetas hreflang de una página.
 */
export async function getTranslationSlugs(
  translationKey: string
): Promise<Partial<Record<Locale, string>>> {
  const entries = await all();
  const map: Partial<Record<Locale, string>> = {};
  for (const e of entries) {
    if (e.data.translationKey === translationKey) {
      map[e.data.lang as Locale] = e.data.slug;
    }
  }
  return map;
}

export async function getCategories(
  locale: Locale
): Promise<Record<Article["data"]["category"], Article[]>> {
  const entries = await getArticlesByLocale(locale);
  const grouped = {
    guide: [] as Article[],
    attraction: [] as Article[],
    around: [] as Article[],
    practical: [] as Article[],
    nearby: [] as Article[],
  };
  for (const e of entries) grouped[e.data.category].push(e);
  return grouped;
}

/** Artículos relacionados (mismo idioma, excluyendo el actual y la pilar). */
export async function getRelated(
  current: Article,
  limit = 4
): Promise<Article[]> {
  const entries = await getArticlesByLocale(current.data.lang as Locale);
  return entries
    .filter((e) => e.id !== current.id && e.data.category !== "guide")
    .slice(0, limit);
}

export const supportedLocales = locales;
