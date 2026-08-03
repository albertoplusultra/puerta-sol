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
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/articles",
    // Los slugs pueden coincidir entre idiomas. El ID interno debe incluir
    // el locale para que Astro no sobrescriba una traducción con otra.
    generateId: ({ data }) => `${data.lang}/${data.slug}`,
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: localeEnum,
    slug: z.string(),
    translationKey: z.string(),
    // guide = pilar; attraction = elementos de la propia plaza;
    // around = alrededores/entorno; food = bares y restaurantes;
    // experiences = tours y actividades (Civitatis); practical = información práctica;
    // nearby = comer/dormir/planificar (conversión)
    category: z.enum([
      "guide",
      "attraction",
      "around",
      "food",
      "experiences",
      "practical",
      "nearby",
    ]),
    // Sección de navegación principal a la que pertenece el artículo.
    // Agrupa el contenido en las cuatro secciones del menú.
    section: z
      .enum(["la-plaza", "edificios", "monumentos", "historias"])
      .optional(),
    // Marca los elementos que ya no existen (p. ej. edificios demolidos).
    // Se agrupan en un bloque aparte ("Desaparecidos") dentro de su sección.
    disappeared: z.boolean().default(false),
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
