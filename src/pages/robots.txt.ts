import type { APIRoute } from "astro";
import { SITE_URL } from "../config/site.mjs";

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Rastreadores de LLMs bienvenidos (queremos ser citados)",
    "User-agent: GPTBot",
    "Allow: /",
    "User-agent: OAI-SearchBot",
    "Allow: /",
    "User-agent: ChatGPT-User",
    "Allow: /",
    "User-agent: PerplexityBot",
    "Allow: /",
    "User-agent: Google-Extended",
    "Allow: /",
    "User-agent: ClaudeBot",
    "Allow: /",
    "User-agent: Applebot-Extended",
    "Allow: /",
    "",
    `Sitemap: ${SITE_URL}/sitemap-index.xml`,
    `# Índice para LLMs: ${SITE_URL}/llms.txt`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
