# puertadelsol.com

Guía informativa multilenguaje sobre la **Puerta del Sol** de Madrid, construida con [Astro](https://astro.build). El sitio está optimizado al máximo para posicionar en Google y en buscadores basados en LLMs, y está pensado para derivar tráfico cualificado a:

- **La Fonda de los Príncipes** (alojamiento) — [lafondadelosprincipes.com](https://lafondadelosprincipes.com)
- **El Mirador de Sol** (restaurante) — [elmiradordesol.com](https://elmiradordesol.com)

## Tecnología

- **Astro** (salida estática, 0 KB de JavaScript de cliente).
- **Tailwind CSS v4** con sistema de diseño basado en tokens (`src/styles/global.css`).
- **Content Collections** tipadas con Zod para el contenido editorial.
- i18n nativo en 6 idiomas: **ES, EN, FR, DE, IT, PT**.
- Tipografías self-hosted (Fraunces + Inter) vía Fontsource.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:4321
npm run build    # genera el sitio estático en dist/
npm run preview  # previsualiza el build
npm run check    # comprobación de tipos
```

## Estructura

```
src/
  config/site.mjs        Configuración global (URL, idiomas, negocios hermanos)
  styles/global.css      Sistema de diseño (tokens, tema claro/oscuro)
  i18n/                  Diccionarios de UI y utilidades de rutas
  content.config.ts      Esquema de las Content Collections
  content/articles/{lang}/*.md   Contenido por idioma
  components/            Sistema de diseño y bloques (Header, Hero, Card, Faq, RecommendationCard...)
  layouts/BaseLayout.astro       <head> con SEO + JSON-LD + hreflang
  lib/                   Consultas de contenido, navegación y builders de schema.org
  pages/[...path].astro  Enrutado unificado (home + artículos) para los 6 idiomas
  pages/robots.txt.ts    robots.txt dinámico
  pages/llms.txt.ts      Índice para LLMs
  pages/llms-full.txt.ts Texto completo para LLMs
```

## Añadir contenido

1. Crea un archivo Markdown en `src/content/articles/{idioma}/{slug}.md`.
2. Completa el frontmatter (`title`, `description`, `lang`, `slug`, `translationKey`, `category`, `updated`...).
3. Usa el mismo `translationKey` en las distintas versiones de idioma para que se enlacen con `hreflang` automáticamente.
4. Campo `promote`: `lodging`, `restaurant`, `both` o `none` para mostrar el bloque de recomendación correspondiente.
5. Campo `faq`: lista de `{ q, a }` que alimenta el bloque de preguntas frecuentes y el JSON-LD `FAQPage`.

Los idiomas FR, DE, IT y PT ya están soportados por la arquitectura: basta con añadir los archivos Markdown correspondientes con el `translationKey` equivalente.

## SEO y LLMs

- `hreflang` (6 idiomas + `x-default`) y `canonical` en cada página.
- JSON-LD: `LandmarksOrHistoricalBuildings`, `Article`, `BreadcrumbList`, `FAQPage`, `Organization`, y `LodgingBusiness`/`Restaurant` con `sameAs` a las webs hermanas.
- `sitemap-index.xml` con alternates de idioma.
- `/llms.txt` y `/llms-full.txt` para buscadores basados en IA; `robots.txt` permite explícitamente a los rastreadores de LLMs.

## Analítica (opcional)

Copia `.env.example` a `.env` y define **una** de estas opciones:

- `PUBLIC_PLAUSIBLE_DOMAIN=puertadelsol.com` (Plausible, sin cookies).
- `PUBLIC_UMAMI_SRC` + `PUBLIC_UMAMI_ID` (Umami auto-alojado).

Si se dejan vacías, no se carga ningún script de terceros.

## Despliegue (Vercel)

El sitio es 100 % estático y se despliega en **Vercel**. Ya incluye `vercel.json` (framework Astro, cabeceras de caché/seguridad y `trailingSlash`).

Pasos:

1. Importa el repositorio en [vercel.com/new](https://vercel.com/new). Vercel detecta Astro automáticamente:
   - Build command: `npm run build`
   - Output directory: `dist`
2. Añade el dominio `puertadelsol.com` en **Settings → Domains** y apunta los DNS según indique Vercel.
3. (Opcional) Configura las variables de analítica en **Settings → Environment Variables** (`PUBLIC_PLAUSIBLE_DOMAIN`, etc.).

No se necesita adaptador: la salida es estática (`output: "static"`).

## Puesta en marcha SEO tras el despliegue

1. **Verifica el dominio** en [Google Search Console](https://search.google.com/search-console) y en [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. **Envía el sitemap**: `https://puertadelsol.com/sitemap-index.xml`.
3. Comprueba `https://puertadelsol.com/robots.txt` y `https://puertadelsol.com/llms.txt`.
4. Sustituye la imagen social por defecto (`public/og-default.svg`) por una imagen real cuando la tengas.
5. Añade fotografías reales usando el componente `ResponsiveImage` (optimización AVIF/WebP con `astro:assets`).
