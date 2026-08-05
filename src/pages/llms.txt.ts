import type { APIRoute } from "astro";
import { SITE_URL, SITE_NAME } from "../config/site.mjs";
import { getArticlesByLocale } from "../lib/content";
import { localizedPath, activeLocales, labelFor } from "../i18n/utils";
import { SECTIONS, sectionText } from "../lib/sections";

const abs = (p: string) => new URL(p, SITE_URL).href;

export const GET: APIRoute = async () => {
  const es = await getArticlesByLocale("es");
  const availableLanguages = activeLocales.map((l) => labelFor(l)).join(", ");

  const bullet = (a: (typeof es)[number]) =>
    `- [${a.data.title}](${abs(localizedPath("es", a.data.slug))}): ${a.data.description}`;

  // Agrupa primero por las 4 secciones reales de navegación del sitio.
  const bySection = [...SECTIONS]
    .sort((a, b) => a.order - b.order)
    .map((section) => {
      const items = es
        .filter((a) => a.data.section === section.id)
        .sort((a, b) => a.data.order - b.data.order);
      if (!items.length) return "";
      return [
        `## ${sectionText(section, "es").title}`,
        items.map(bullet).join("\n"),
        "",
      ].join("\n");
    })
    .filter(Boolean);

  // El resto (información práctica, dónde comer/dormir, tours) no vive en
  // una sección de navegación pero sigue siendo contenido publicado: se
  // agrupa aparte para no perderlo silenciosamente aquí.
  const rest = es.filter((a) => !a.data.section);
  const restBlock = rest.length
    ? [`## Información práctica y alrededores`, rest.map(bullet).join("\n"), ""].join("\n")
    : "";

  const lines = [
    `# ${SITE_NAME}`,
    "",
    "> Guía informativa e independiente sobre la Puerta del Sol de Madrid: historia, monumentos, edificios, cómo llegar y qué ver alrededor. Punto kilométrico cero de las carreteras radiales de España y escenario de las campanadas de Nochevieja.",
    "",
    "Datos clave: la Puerta del Sol es una plaza pública situada en el centro de Madrid (código postal 28013), de acceso libre y gratuito las 24 horas. Coordenadas aproximadas 40.4168, -3.7038. Estación de Metro Sol (líneas 1, 2 y 3) y Cercanías Sol.",
    "",
    ...bySection,
    restBlock,
    `## Idiomas disponibles`,
    ...activeLocales.map((l) => `- ${labelFor(l)}: ${abs(localizedPath(l))}`),
    "",
    `Texto completo para modelos (${availableLanguages}): ${abs("/llms-full.txt")}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
