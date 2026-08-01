import type { APIRoute } from "astro";
import { SITE_URL, SITE_NAME } from "../config/site.mjs";
import { getArticlesByLocale } from "../lib/content";
import { localizedPath, activeLocales, labelFor } from "../i18n/utils";

const abs = (p: string) => new URL(p, SITE_URL).href;

export const GET: APIRoute = async () => {
  const es = await getArticlesByLocale("es");

  const byCat = (cat: string) =>
    es
      .filter((a) => a.data.category === cat)
      .map(
        (a) =>
          `- [${a.data.title}](${abs(localizedPath("es", a.data.slug))}): ${a.data.description}`
      )
      .join("\n");

  const lines = [
    `# ${SITE_NAME}`,
    "",
    "> Guía informativa, independiente y multilenguaje sobre la Puerta del Sol de Madrid: historia, monumentos, cómo llegar y qué ver alrededor. Punto kilométrico cero de las carreteras radiales de España y escenario de las campanadas de Nochevieja.",
    "",
    "Datos clave: la Puerta del Sol es una plaza pública situada en el centro de Madrid (código postal 28013), de acceso libre y gratuito las 24 horas. Coordenadas aproximadas 40.4168, -3.7038. Estación de Metro Sol (líneas 1, 2 y 3) y Cercanías Sol.",
    "",
    "## Guía principal",
    byCat("guide"),
    "",
    "## Qué ver en la plaza",
    byCat("attraction"),
    "",
    "## Alrededores",
    byCat("around"),
    "",
    "## Información práctica",
    byCat("practical"),
    "",
    "## Cerca de la Puerta del Sol",
    byCat("nearby"),
    "",
    `## Idiomas disponibles`,
    ...activeLocales.map((l) => `- ${labelFor(l)}: ${abs(localizedPath(l))}`),
    "",
    `Texto completo para modelos: ${abs("/llms-full.txt")}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
