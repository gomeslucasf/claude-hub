import { Link } from "@tanstack/react-router";
import { ChevronRight, Star } from "lucide-react";
import type { Skill } from "@/services/github";
import { topicLabel } from "@/lib/taxonomy";

export function SkillRow({ skill }: { skill: Skill }) {
  const tags = skill.topics.filter((t) => t !== "claude-skill" && t !== "featured").slice(0, 2);

  return (
    <Link
      to="/skills/$repo"
      params={{ repo: skill.slug }}
      className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 transition-colors active:bg-surface hover:border-primary/40"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 font-mono text-sm font-bold text-primary">
        {skill.name.slice(0, 2).toUpperCase()}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-[15px] font-semibold leading-tight">
          {skill.name}
        </span>
        <span className="mt-0.5 block line-clamp-2 text-[13px] leading-snug text-muted-foreground">
          {skill.description ?? "Sem descrição."}
        </span>
        <span className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
          {tags.map((t) => (
            <span key={t} className="rounded-full border border-border px-2 py-0.5">
              {topicLabel(t)}
            </span>
          ))}
          {skill.stars > 0 && (
            <span className="inline-flex items-center gap-1">
              <Star className="size-3" /> {skill.stars}
            </span>
          )}
        </span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}
