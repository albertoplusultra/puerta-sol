import type { Locale } from "../i18n/utils";
import { getSectionNav, type NavItem } from "./sections";

export type { NavItem };

/**
 * Navegación principal: una entrada por sección
 * (La plaza, Edificios, Monumentos, Historias de Sol).
 */
export async function getNav(locale: Locale): Promise<NavItem[]> {
  return getSectionNav(locale);
}
