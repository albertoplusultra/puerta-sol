// Configuración global del sitio. Sin dependencias para poder importarse
// tanto desde astro.config.mjs como desde componentes/utilidades.

// Versión canónica única del sitio: www. El dominio raíz (apex) redirige a www
// mediante la configuración de vercel.json.
export const SITE_URL = "https://www.puertadelsol.com";

export const DEFAULT_LOCALE = "es";
export const LOCALES = ["es", "en", "fr", "de", "it", "pt"];

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
    url: "https://lafondadelosprincipes.com",
    type: "LodgingBusiness",
  },
  restaurant: {
    key: "restaurant",
    name: "El Mirador de Sol",
    url: "https://elmiradordesol.com",
    type: "Restaurant",
  },
};
