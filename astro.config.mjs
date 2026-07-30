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
      // El idioma por defecto (ES) vive en la raíz, el resto con prefijo (/en/, /fr/...)
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
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
