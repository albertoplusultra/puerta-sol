// Selección de tours y actividades de Civitatis que empiezan o pasan por la
// Puerta del Sol. Las rutas (`path`) son las páginas reales de Civitatis; el ID
// de afiliado se añade de forma centralizada en `civitatisUrl` (src/config/site.mjs).
// Las imágenes proceden de la ficha de cada tour en Civitatis.

import type { ImageMetadata } from "astro";
import expFreeTour from "../assets/exp-free-tour.jpg";
import expMisterios from "../assets/exp-misterios.jpg";
import expSigloOro from "../assets/exp-siglo-oro.jpg";
import expPrado from "../assets/exp-prado.jpg";
import expPalacioReal from "../assets/exp-palacio-real.jpg";
import expFlamenco from "../assets/exp-flamenco.jpg";
import type { Locale } from "../i18n/utils";

export interface Experience {
  title: string;
  description: string;
  /** Ruta relativa dentro de civitatis.com (sin dominio). */
  path: string;
  /** Imagen de la ficha del tour. */
  image: ImageMetadata;
  /** Duración aproximada u otra información breve. */
  meta?: string;
  /** true si la actividad arranca en la propia Puerta del Sol. */
  startsAtSol?: boolean;
}

type ExperienceLocale = Extract<Locale, "es" | "en" | "fr">;

interface LocalizedExperience {
  title: Record<ExperienceLocale, string>;
  description: Record<ExperienceLocale, string>;
  path: Record<ExperienceLocale, string>;
  image: ImageMetadata;
  meta?: Record<ExperienceLocale, string>;
  startsAtSol?: boolean;
}

const EXPERIENCES: LocalizedExperience[] = [
  {
    title: {
      es: "Free tour por Madrid",
      en: "Free walking tour of Madrid",
      fr: "Visite gratuite de Madrid",
    },
    description: {
      es: "El paseo a pie más popular de la ciudad arranca en la propia Puerta del Sol, junto al Kilómetro Cero, y recorre los rincones y leyendas del Madrid histórico.",
      en: "The city's most popular walking tour starts in Puerta del Sol, beside Kilometre Zero, and explores the landmarks and legends of historic Madrid.",
      fr: "La visite à pied la plus populaire de la ville part de la Puerta del Sol, près du Kilomètre Zéro, et explore les lieux et légendes du Madrid historique.",
    },
    path: {
      es: "/es/madrid/free-tour-madrid",
      en: "/en/madrid/free-tour-madrid",
      fr: "/fr/madrid/visite-guidee-gratuite-madrid",
    },
    image: expFreeTour,
    meta: {
      es: "2 horas · Gratis (con reserva)",
      en: "2 hours · Free (booking required)",
      fr: "2 heures · Gratuit (sur réservation)",
    },
    startsAtSol: true,
  },
  {
    title: {
      es: "Tour de los misterios y leyendas de Madrid",
      en: "Madrid mysteries and legends tour",
      fr: "Visite des mystères et légendes de Madrid",
    },
    description: {
      es: "Un recorrido nocturno por el casco antiguo que parte del centro, a un paso de Sol, para descubrir los crímenes, enigmas y leyendas más oscuros de la capital.",
      en: "An evening walk through the old town, starting near Sol, to discover the capital's darkest crimes, mysteries and legends.",
      fr: "Une visite nocturne de la vieille ville, au départ du centre près de Sol, à la découverte des crimes, énigmes et légendes les plus sombres de la capitale.",
    },
    path: {
      es: "/es/madrid/tour-misterios-leyendas-madrid",
      en: "/en/madrid/mysteries-legends-tour",
      fr: "/fr/madrid/visite-mysteres-madrid",
    },
    image: expMisterios,
    meta: { es: "2 horas", en: "2 hours", fr: "2 heures" },
    startsAtSol: true,
  },
  {
    title: {
      es: "Free tour del Siglo de Oro y el Barrio de las Letras",
      en: "Free tour of the Golden Age and Literary Quarter",
      fr: "Visite gratuite du Siècle d’or et du Quartier des Lettres",
    },
    description: {
      es: "Cervantes, Lope de Vega y Quevedo protagonizan este paseo por el Barrio de las Letras, justo al lado de la Puerta del Sol.",
      en: "Cervantes, Lope de Vega and Quevedo take centre stage on this walk through the Literary Quarter, next to Puerta del Sol.",
      fr: "Cervantes, Lope de Vega et Quevedo sont au cœur de cette promenade dans le Quartier des Lettres, juste à côté de la Puerta del Sol.",
    },
    path: {
      es: "/es/madrid/tour-siglo-oro-madrid",
      en: "/en/madrid/golden-age-tour",
      fr: "/fr/madrid/visite-siecle-or",
    },
    image: expSigloOro,
    meta: {
      es: "2h 15m · Gratis (con reserva)",
      en: "2h 15m · Free (booking required)",
      fr: "2 h 15 · Gratuit (sur réservation)",
    },
    startsAtSol: true,
  },
  {
    title: {
      es: "Visita guiada por el Museo del Prado",
      en: "Guided tour of the Prado Museum",
      fr: "Visite guidée du musée du Prado",
    },
    description: {
      es: "A un corto paseo desde Sol, recorre con un guía las obras maestras de una de las mejores pinacotecas del mundo, saltándote las colas.",
      en: "A short walk from Sol, discover the masterpieces of one of the world's finest art museums with a guide and skip the queues.",
      fr: "À quelques pas de Sol, découvrez avec un guide les chefs-d’œuvre de l’un des plus grands musées du monde, sans faire la queue.",
    },
    path: {
      es: "/es/madrid/visita-guiada-museo-prado",
      en: "/en/madrid/prado-museum-guided-tour",
      fr: "/fr/madrid/visite-guidee-musee-prado",
    },
    image: expPrado,
    meta: { es: "1h 30m", en: "1h 30m", fr: "1 h 30" },
  },
  {
    title: {
      es: "Visita guiada por el Palacio Real",
      en: "Guided tour of the Royal Palace",
      fr: "Visite guidée du Palais royal",
    },
    description: {
      es: "Descubre los salones y jardines del palacio más grande de Europa Occidental. Muchas rutas a pie por el centro histórico enlazan con la Puerta del Sol.",
      en: "Discover the rooms and gardens of Western Europe's largest palace. Many old-town walking routes connect it with Puerta del Sol.",
      fr: "Découvrez les salons et jardins du plus grand palais d’Europe occidentale. De nombreux itinéraires du centre historique le relient à la Puerta del Sol.",
    },
    path: {
      es: "/es/madrid/visita-guiada-palacio-real",
      en: "/en/madrid/royal-palace-guided-tour",
      fr: "/fr/madrid/visite-guidee-palais-real",
    },
    image: expPalacioReal,
    meta: { es: "1h 30m - 2h", en: "1h 30m - 2h", fr: "1 h 30 - 2 h" },
  },
  {
    title: {
      es: "Espectáculo flamenco en Torres Bermejas",
      en: "Flamenco show at Torres Bermejas",
      fr: "Spectacle de flamenco à Torres Bermejas",
    },
    description: {
      es: "A pocos minutos de la plaza, disfruta del cante y el baile flamenco en uno de los tablaos más emblemáticos de Madrid.",
      en: "A few minutes from the square, enjoy flamenco singing and dancing at one of Madrid's most iconic tablaos.",
      fr: "À quelques minutes de la place, profitez du chant et de la danse flamenco dans l’un des tablaos les plus emblématiques de Madrid.",
    },
    path: {
      es: "/es/madrid/espectaculo-flamenco-torres-bermejas",
      en: "/en/madrid/torres-bermejas-flamenco-show",
      fr: "/fr/madrid/spectacle-flamenco-torre-bermejas",
    },
    image: expFlamenco,
    meta: { es: "1 hora", en: "1 hour", fr: "1 heure" },
  },
];

export function getExperiences(locale: Locale): Experience[] {
  const supported: ExperienceLocale =
    locale === "en" || locale === "fr" ? locale : "es";

  return EXPERIENCES.map((experience) => ({
    title: experience.title[supported],
    description: experience.description[supported],
    path: experience.path[supported],
    image: experience.image,
    meta: experience.meta?.[supported],
    startsAtSol: experience.startsAtSol,
  }));
}
