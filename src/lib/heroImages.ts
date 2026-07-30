import type { ImageMetadata } from "astro";
import solHero from "../assets/sol-hero.jpg";
import solHistoria from "../assets/sol-historia.jpg";
import solCampanadas from "../assets/sol-campanadas.jpg";

// Registro filename -> imagen importada (para optimización con astro:assets).
// El frontmatter `hero` de cada artículo referencia una de estas claves.
export const heroImages: Record<string, ImageMetadata> = {
  "sol-hero.jpg": solHero,
  "sol-historia.jpg": solHistoria,
  "sol-campanadas.jpg": solCampanadas,
};

export function getHeroImage(key?: string): ImageMetadata | undefined {
  return key ? heroImages[key] : undefined;
}
