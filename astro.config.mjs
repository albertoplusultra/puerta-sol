// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { SITE_URL, LOCALES, DEFAULT_LOCALE } from "./src/config/site.mjs";

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
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
