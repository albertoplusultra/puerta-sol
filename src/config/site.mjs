// Configuración global del sitio. Sin dependencias para poder importarse
// tanto desde astro.config.mjs como desde componentes/utilidades.

// Versión canónica única del sitio: www. El dominio raíz (apex) redirige a www
// mediante la configuración de vercel.json.
export const SITE_URL = "https://www.puertadelsol.com";

export const DEFAULT_LOCALE = "es";
export const LOCALES = ["es", "en", "fr", "de", "it", "pt"];

// Idiomas que se publican realmente (con contenido). La arquitectura soporta
// los 6 de LOCALES, pero solo se generan páginas y selector para estos.
export const ACTIVE_LOCALES = ["es", "en"];

// Etiquetas hreflang (BCP-47) por locale
export const HREFLANG = {
  es: "es-ES",
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  pt: "pt-PT",
};

// Nombre nativo de cada idioma para el selector
export const LOCALE_LABELS = {
  es: "Español",
  en: "English",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
};

// Marca
export const SITE_NAME = "Puerta del Sol";
// Marca usada como sufijo en los <title> de las páginas
export const SITE_BRAND = "PuertaDelSol.com";
export const SITE_TWITTER = "@puertadelsol";

// Coordenadas del monumento (para JSON-LD y mapas)
export const GEO = {
  latitude: 40.4168,
  longitude: -3.7038,
};

// Propiedades hermanas a las que derivamos tráfico.
// Enlaces dofollow: son propiedades relacionadas y transfieren relevancia temática.
export const PARTNERS = {
  lodging: {
    key: "lodging",
    name: "La Fonda de los Príncipes",
    url: "https://www.lafondadelosprincipes.com",
    type: "LodgingBusiness",
  },
  restaurant: {
    key: "restaurant",
    name: "El Mirador de Sol",
    url: "https://www.elmiradordesol.com",
    type: "Restaurant",
  },
};

// Civitatis (tours y actividades). Los enlaces salen como `nofollow` por tratarse
// de un tercero comercial. Rellena `affiliateId` cuando tengas la cuenta de afiliado
// para monetizar los clics; mientras esté vacío, los enlaces apuntan directos a Civitatis.
export const CIVITATIS = {
  // p. ej. "12345" -> se añade a las URLs como ?aid=12345
  affiliateId: "",
  baseUrl: "https://www.civitatis.com",
};

/** Construye la URL final de Civitatis, añadiendo el ID de afiliado si existe. */
export function civitatisUrl(path) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const base = `${CIVITATIS.baseUrl}${clean}`;
  return CIVITATIS.affiliateId ? `${base}?aid=${CIVITATIS.affiliateId}` : base;
}
