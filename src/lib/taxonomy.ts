import type { Skill } from "@/services/github";

export interface Category {
  topic: string;
  label: string;
}

export const CATEGORIES: Category[] = [
  { topic: "claude-code", label: "Claude Code" },
  { topic: "mcp", label: "MCP" },
  { topic: "automation", label: "Automação" },
  { topic: "productivity", label: "Produtividade" },
  { topic: "coding", label: "Desenvolvimento" },
  { topic: "documents", label: "Documentos" },
  { topic: "research", label: "Pesquisa" },
  { topic: "beginner", label: "Para iniciantes" },
];

export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.topic, c.label]),
);

export function topicLabel(topic: string) {
  return CATEGORY_LABELS[topic] ?? topic.replace(/-/g, " ");
}

/** Badges de curadoria derivados de Topics. */
export const CURATION_BADGES: Record<string, { label: string; tone: "tested" | "recommended" | "beginner" | "advanced" }> = {
  tested: { label: "Testado por mim", tone: "tested" },
  recommended: { label: "Recomendado", tone: "recommended" },
  beginner: { label: "Para iniciantes", tone: "beginner" },
  advanced: { label: "Avançado", tone: "advanced" },
};

export function curationBadges(skill: Skill) {
  return skill.topics.filter((t) => t in CURATION_BADGES).map((t) => ({ topic: t, ...CURATION_BADGES[t] }));
}

export type SortKey = "updated" | "recent" | "popular";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "updated", label: "Mais atualizados" },
  { value: "recent", label: "Mais recentes" },
  { value: "popular", label: "Mais populares" },
];

export function sortSkills(skills: Skill[], key: SortKey): Skill[] {
  const list = [...skills];
  if (key === "popular") return list.sort((a, b) => b.stars - a.stars || b.forks - a.forks);
  if (key === "recent") return list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  return list.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export function filterSkills(skills: Skill[], search: string, topic: string | null): Skill[] {
  const q = search.trim().toLowerCase();
  return skills.filter((s) => {
    if (topic && !s.topics.includes(topic)) return false;
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      (s.description ?? "").toLowerCase().includes(q) ||
      s.topics.some((t) => t.toLowerCase().includes(q) || topicLabel(t).toLowerCase().includes(q))
    );
  });
}

/** Destaque: primeiro repo com topic `featured`, senão o mais recentemente atualizado. */
export function pickFeatured(skills: Skill[]): Skill | null {
  if (skills.length === 0) return null;
  return skills.find((s) => s.featured) ?? skills[0] ?? null;
}

export function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days < 1) return "hoje";
  if (days === 1) return "ontem";
  if (days < 30) return `há ${days} dias`;
  const months = Math.floor(days / 30);
  if (months < 12) return `há ${months} ${months === 1 ? "mês" : "meses"}`;
  const years = Math.floor(months / 12);
  return `há ${years} ${years === 1 ? "ano" : "anos"}`;
}
