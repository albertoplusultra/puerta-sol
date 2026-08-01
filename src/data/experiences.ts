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

export const EXPERIENCES: Experience[] = [
  {
    title: "Free tour por Madrid",
    description:
      "El paseo a pie más popular de la ciudad arranca en la propia Puerta del Sol, junto al Kilómetro Cero, y recorre los rincones y leyendas del Madrid histórico.",
    path: "/es/madrid/free-tour-madrid",
    image: expFreeTour,
    meta: "2 horas · Gratis (con reserva)",
    startsAtSol: true,
  },
  {
    title: "Tour de los misterios y leyendas de Madrid",
    description:
      "Un recorrido nocturno por el casco antiguo que parte del centro, a un paso de Sol, para descubrir los crímenes, enigmas y leyendas más oscuros de la capital.",
    path: "/es/madrid/tour-misterios-leyendas-madrid",
    image: expMisterios,
    meta: "2 horas",
    startsAtSol: true,
  },
  {
    title: "Free tour del Siglo de Oro y el Barrio de las Letras",
    description:
      "Cervantes, Lope de Vega y Quevedo protagonizan este paseo por el Barrio de las Letras, justo al lado de la Puerta del Sol.",
    path: "/es/madrid/tour-siglo-oro-madrid",
    image: expSigloOro,
    meta: "2h 15m · Gratis (con reserva)",
    startsAtSol: true,
  },
  {
    title: "Visita guiada por el Museo del Prado",
    description:
      "A un corto paseo desde Sol, recorre con un guía las obras maestras de una de las mejores pinacotecas del mundo, saltándote las colas.",
    path: "/es/madrid/visita-guiada-museo-prado",
    image: expPrado,
    meta: "1h 30m",
  },
  {
    title: "Visita guiada por el Palacio Real",
    description:
      "Descubre los salones y jardines del palacio más grande de Europa Occidental. Muchas rutas a pie por el centro histórico enlazan con la Puerta del Sol.",
    path: "/es/madrid/visita-guiada-palacio-real",
    image: expPalacioReal,
    meta: "1h 30m - 2h",
  },
  {
    title: "Espectáculo flamenco en Torres Bermejas",
    description:
      "A pocos minutos de la plaza, disfruta del cante y el baile flamenco en uno de los tablaos más emblemáticos de Madrid.",
    path: "/es/madrid/espectaculo-flamenco-torres-bermejas",
    image: expFlamenco,
    meta: "1 hora",
  },
];
