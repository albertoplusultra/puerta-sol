import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { LOCALES } from "./config/site.mjs";

const localeEnum = z.enum(LOCALES as [string, ...string[]]);

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

/**
 * Artículos y páginas de contenido. Cada archivo vive bajo su carpeta de idioma:
 *   src/content/articles/{lang}/{slug}.md
 * El campo `translationKey` agrupa las versiones equivalentes en distintos idiomas
 * (imprescindible para generar hreflang correctamente).
 */
const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: localeEnum,
    slug: z.string(),
    translationKey: z.string(),
    // guide = página pilar; el resto son satélite del clúster temático
    category: z.enum(["guide", "attraction", "practical", "nearby"]),
    order: z.number().default(100),
    updated: z.coerce.date(),
    keywords: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    // CTA de conversión hacia las webs hermanas
    promote: z.enum(["lodging", "restaurant", "both", "none"]).default("none"),
    hero: z.string().optional(),
    heroAlt: z.string().optional(),
    // Preguntas frecuentes -> alimentan el schema FAQPage
    faq: z.array(faqItem).default([]),
  }),
});

export const collections = { articles };
