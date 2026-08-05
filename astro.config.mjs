// @ts-check
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { SITE_URL, LOCALES, DEFAULT_LOCALE, ACTIVE_LOCALES, HREFLANG } from "./src/config/site.mjs";

/**
 * Los slugs de un mismo artículo pueden ser distintos entre idiomas
 * (p. ej. /es/gran-reforma/ vs /en/great-renovation/). El emparejamiento
 * automático de hreflang de @astrojs/sitemap solo funciona cuando la ruta es
 * idéntica salvo el prefijo de idioma, así que aquí construimos el mapa real
 * a partir del frontmatter (`translationKey`) para corregir esos casos en
 * el sitemap. Se lee directamente del sistema de archivos porque este
 * fichero se ejecuta fuera del runtime de Astro (sin acceso a astro:content).
 */
function buildArticleHreflangMap() {
  const articlesDir = fileURLToPath(new URL("./src/content/articles/", import.meta.url));
  const byKey = {};

  for (const lang of fs.readdirSync(articlesDir, { withFileTypes: true })) {
    if (!lang.isDirectory()) continue;
    const langDir = path.join(articlesDir, lang.name);
    for (const file of fs.readdirSync(langDir)) {
      if (!/\.mdx?$/.test(file)) continue;
      const raw = fs.readFileSync(path.join(langDir, file), "utf-8");
      const frontmatter = raw.split("---")[1] ?? "";
      const slug = frontmatter.match(/^slug:\s*"?(.*?)"?\s*$/m)?.[1];
      const translationKey = frontmatter.match(/^translationKey:\s*"?(.*?)"?\s*$/m)?.[1];
      if (!slug || !translationKey) continue;
      (byKey[translationKey] ??= {})[lang.name] = slug;
    }
  }

  /** @type {Record<string, Record<string, string>>} pathname -> { lang: pathname } */
  const map = {};
  for (const slugsByLang of Object.values(byKey)) {
    const alternates = {};
    for (const [lang, slug] of Object.entries(slugsByLang)) {
      if (ACTIVE_LOCALES.includes(lang)) alternates[lang] = `/${lang}/${slug}/`;
    }
    if (Object.keys(alternates).length < 2) continue;
    for (const pathname of Object.values(alternates)) map[pathname] = alternates;
  }
  return map;
}

const articleHreflangMap = buildArticleHreflangMap();

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES,
    routing: {
      // Todos los idiomas con prefijo, incluido español (/es/, /en/...).
      // La raíz redirige a /es/.
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      // Excluir la redirección de la raíz "/" (no es una página indexable)
      filter: (page) => new URL(page).pathname !== "/",
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: {
          es: "es-ES",
          en: "en-US",
          fr: "fr-FR",
          de: "de-DE",
          it: "it-IT",
          pt: "pt-PT",
        },
      },
      // Corrige los grupos de traducciones cuyos slugs difieren entre idiomas
      // (ver buildArticleHreflangMap).
      // El resto de páginas conserva el emparejamiento automático de arriba.
      serialize(item) {
        const alternates = articleHreflangMap[new URL(item.url).pathname];
        if (alternates) {
          item.links = Object.entries(alternates).map(([lang, pathname]) => ({
            lang: HREFLANG[lang],
            url: new URL(pathname, SITE_URL).href,
          }));
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
