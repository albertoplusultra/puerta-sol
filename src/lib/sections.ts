import type { Locale } from "../i18n/utils";
import { localizedPath } from "../i18n/utils";
import { getArticlesByLocale, type Article } from "./content";

export type SectionId = "la-plaza" | "edificios" | "monumentos" | "historias";

interface SectionText {
  /** Etiqueta corta para el menú */
  label: string;
  /** Título de la página de sección */
  title: string;
  /** Entradilla / descripción de la sección */
  description: string;
}

interface SectionDef {
  id: SectionId;
  slug: string;
  order: number;
  /** Imagen de cabecera (clave de heroImages) */
  hero: string;
  text: Partial<Record<Locale, SectionText>>;
}

/**
 * Secciones de la navegación principal. Cada artículo se asigna a una de ellas
 * mediante el campo `section` de su frontmatter.
 */
export const SECTIONS: SectionDef[] = [
  {
    id: "la-plaza",
    slug: "la-plaza",
    order: 10,
    hero: "sol-que-ver.jpg",
    text: {
      es: {
        label: "La plaza",
        title: "La plaza",
        description:
          "El corazón de Madrid, elemento a elemento: qué ver en la Puerta del Sol y el Kilómetro Cero, el punto desde el que se miden las carreteras de España.",
      },
      en: {
        label: "The Square",
        title: "The Square",
        description:
          "The heart of Madrid, element by element: what to see in Puerta del Sol and Kilometre Zero, the point from which Spain's roads are measured.",
      },
      fr: {
        label: "La place",
        title: "La place",
        description:
          "Le cœur de Madrid, élément par élément : que voir à la Puerta del Sol et le Kilomètre Zéro, point de départ du réseau routier espagnol.",
      },
    },
  },
  {
    id: "edificios",
    slug: "edificios",
    order: 20,
    hero: "sol-casa-correos.jpg",
    text: {
      es: {
        label: "Edificios",
        title: "Edificios",
        description:
          "La arquitectura que da forma a la plaza: la Real Casa de Correos y su reloj, y el antiguo Hotel de París, hoy tienda de Apple.",
      },
      en: {
        label: "Buildings",
        title: "Buildings",
        description:
          "The architecture that shapes the square: the Real Casa de Correos and its clock, and the former Hotel de París, today an Apple store.",
      },
      fr: {
        label: "Édifices",
        title: "Édifices",
        description:
          "L’architecture qui façonne la place : la Real Casa de Correos et son horloge, ainsi que l’ancien Hotel de París, aujourd’hui occupé par Apple.",
      },
    },
  },
  {
    id: "monumentos",
    slug: "monumentos",
    order: 30,
    hero: "sol-oso-madrono.jpg",
    text: {
      es: {
        label: "Monumentos",
        title: "Monumentos",
        description:
          "Los símbolos que dan identidad a la Puerta del Sol: el Oso y el Madroño y el histórico cartel de Tío Pepe.",
      },
      en: {
        label: "Monuments",
        title: "Monuments",
        description:
          "The symbols that give Puerta del Sol its identity: the Bear and the Strawberry Tree and the historic Tío Pepe sign.",
      },
      fr: {
        label: "Monuments",
        title: "Monuments",
        description:
          "Les symboles qui donnent son identité à la Puerta del Sol : l’Ours et l’Arbousier, et l’enseigne historique de Tío Pepe.",
      },
    },
  },
  {
    id: "historias",
    slug: "historias",
    order: 40,
    hero: "sol-historia.jpg",
    text: {
      es: {
        label: "Historias de Sol",
        title: "Historias de Sol",
        description:
          "La memoria viva de la plaza: la historia de la Puerta del Sol y la tradición de las campanadas de Nochevieja.",
      },
      en: {
        label: "Stories of Sol",
        title: "Stories of Sol",
        description:
          "The living memory of the square: the history of Puerta del Sol and the New Year's Eve chimes tradition.",
      },
      fr: {
        label: "Histoires de Sol",
        title: "Histoires de Sol",
        description:
          "La mémoire vivante de la place : l’histoire de la Puerta del Sol et la tradition des douze coups de minuit du Nouvel An.",
      },
    },
  },
];

const byId = new Map(SECTIONS.map((s) => [s.id, s]));

export function getSection(id: SectionId): SectionDef | undefined {
  return byId.get(id);
}

/** Texto de la sección en el idioma dado, con fallback a español. */
export function sectionText(section: SectionDef, locale: Locale): SectionText {
  return section.text[locale] ?? section.text.es!;
}

export interface NavItem {
  label: string;
  href: string;
}

/** Elementos del menú principal (una entrada por sección). */
export function getSectionNav(locale: Locale): NavItem[] {
  return [...SECTIONS]
    .sort((a, b) => a.order - b.order)
    .map((s) => ({
      label: sectionText(s, locale).label,
      href: localizedPath(locale, s.slug),
    }));
}

/** Artículos que pertenecen a una sección, ordenados por `order`. */
export async function getSectionArticles(
  locale: Locale,
  id: SectionId
): Promise<Article[]> {
  const articles = await getArticlesByLocale(locale);
  return articles.filter((a) => a.data.section === id);
}
