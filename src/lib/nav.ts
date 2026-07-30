import type { Locale } from "../i18n/utils";
import { localizedPath } from "../i18n/utils";
import { getArticlesByLocale } from "./content";
import { useTranslations } from "../i18n/utils";

export interface NavItem {
  label: string;
  href: string;
}

// translationKeys que aparecen en la navegación principal, en orden.
const NAV_KEYS = ["historia", "que-ver", "alrededores", "como-llegar", "plan"] as const;

export async function getNav(locale: Locale): Promise<NavItem[]> {
  const t = useTranslations(locale);
  const articles = await getArticlesByLocale(locale);
  const byKey = new Map(articles.map((a) => [a.data.translationKey, a]));

  const labelFor: Record<(typeof NAV_KEYS)[number], string> = {
    historia: t("nav.history"),
    "que-ver": t("nav.attractions"),
    alrededores: t("nav.around"),
    "como-llegar": t("nav.practical"),
    plan: t("nav.plan"),
  };

  const items: NavItem[] = [];
  for (const key of NAV_KEYS) {
    const entry = byKey.get(key);
    if (entry) {
      items.push({
        label: labelFor[key],
        href: localizedPath(locale, entry.data.slug),
      });
    }
  }
  return items;
}
