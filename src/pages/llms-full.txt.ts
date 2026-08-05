import type { APIRoute } from "astro";
import { SITE_URL, SITE_NAME } from "../config/site.mjs";
import { getArticlesByLocale } from "../lib/content";
import { localizedPath, activeLocales, labelFor, type Locale } from "../i18n/utils";

const abs = (p: string) => new URL(p, SITE_URL).href;

// Convierte el markdown del cuerpo a texto plano razonable para LLMs.
function toPlain(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^import\s.*$/gm, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#*_>`]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const GET: APIRoute = async () => {
  const langLabel = activeLocales.map((l) => labelFor(l)).join(", ");

  const parts = [
    `# ${SITE_NAME} — Contenido completo`,
    "",
    `Guía informativa sobre la Puerta del Sol de Madrid. Este documento incluye el contenido completo en ${langLabel}.`,
    "",
  ];

  for (const locale of activeLocales as Locale[]) {
    const articles = await getArticlesByLocale(locale);
    parts.push(
      `\n\n#####################################################`,
      `# ${labelFor(locale).toUpperCase()} (${locale})`,
      `#####################################################`
    );

    for (const a of articles) {
      parts.push(
        `\n\n=====================================================`,
        `URL: ${abs(localizedPath(locale, a.data.slug))}`,
        `Título: ${a.data.title}`,
        `Descripción: ${a.data.description}`,
        `Actualizado: ${a.data.updated.toISOString().slice(0, 10)}`,
        `=====================================================\n`,
        toPlain(a.body ?? "")
      );
      if (a.data.faq.length) {
        parts.push("\nPreguntas frecuentes:");
        for (const f of a.data.faq) {
          parts.push(`P: ${f.q}\nR: ${toPlain(f.a)}`);
        }
      }
    }
  }

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
