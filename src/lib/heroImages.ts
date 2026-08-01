import type { ImageMetadata } from "astro";
import solHero from "../assets/sol-hero.jpg";
import solHistoria from "../assets/sol-historia.jpg";
import solCampanadas from "../assets/sol-campanadas.jpg";
import solHeroOld from "../assets/sol-hero-old.png";
import solHeroPortada from "../assets/sol-hero-portada.jpg";
import solTioPepe from "../assets/sol-tio-pepe.jpg";
import solCasaCorreos from "../assets/sol-casa-correos.jpg";
import solQueVer from "../assets/sol-que-ver.jpg";
import solOsoMadrono from "../assets/sol-oso-madrono.jpg";
import solMariblanca from "../assets/sol-mariblanca.jpg";
import solKmCero from "../assets/sol-km-cero.jpg";
import solNochevieja from "../assets/sol-nochevieja.jpg";
import solCallao from "../assets/sol-callao.jpg";
import solDiligenciasMetro from "../assets/sol-diligencias-metro.jpg";

// Registro filename -> imagen importada (para optimización con astro:assets).
// El frontmatter `hero` de cada artículo referencia una de estas claves.
export const heroImages: Record<string, ImageMetadata> = {
  "sol-hero.jpg": solHero,
  "sol-historia.jpg": solHistoria,
  "sol-campanadas.jpg": solCampanadas,
  "sol-hero-old.png": solHeroOld,
  "sol-hero-portada.jpg": solHeroPortada,
  "sol-tio-pepe.jpg": solTioPepe,
  "sol-casa-correos.jpg": solCasaCorreos,
  "sol-que-ver.jpg": solQueVer,
  "sol-oso-madrono.jpg": solOsoMadrono,
  "sol-mariblanca.jpg": solMariblanca,
  "sol-km-cero.jpg": solKmCero,
  "sol-nochevieja.jpg": solNochevieja,
  "sol-callao.jpg": solCallao,
  "sol-diligencias-metro.jpg": solDiligenciasMetro,
};

export function getHeroImage(key?: string): ImageMetadata | undefined {
  return key ? heroImages[key] : undefined;
}
