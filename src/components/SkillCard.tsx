import { Link } from "@tanstack/react-router";
import { GitFork, Github, Star } from "lucide-react";
import type { Skill } from "@/services/github";
import { curationBadges, formatRelative, topicLabel } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/badge";

export function CurationBadges({ skill }: { skill: Skill }) {
  const badges = curationBadges(skill);
  if (badges.length === 0) return null;
  return (
    <>
      {badges.map((b) => (
        <span
          key={b.topic}
          data-tone={b.tone}
          className="rounded-full border px-2 py-0.5 text-[11px] font-medium data-[tone=advanced]:border-info/40 data-[tone=advanced]:text-info data-[tone=beginner]:border-info/40 data-[tone=beginner]:text-info data-[tone=recommended]:border-primary/50 data-[tone=recommended]:text-primary data-[tone=tested]:border-success/40 data-[tone=tested]:text-success"
        >
          {b.label}
        </span>
      ))}
    </>
  );
}

export function SkillCard({ skill }: { skill: Skill }) {
  const tags = skill.topics.filter((t) => t !== "claude-skill" && t !== "featured").slice(0, 3);

  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-semibold leading-tight">
          <Link
            to="/skills/$repo"
            params={{ repo: skill.slug }}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {skill.name}
          </Link>
        </h3>
        <a
          href={skill.htmlUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir no GitHub"
          className="relative z-10 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="size-4" />
        </a>
      </div>

      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
        {skill.description ?? "Sem descrição."}
      </p>

      {skill.isFork && skill.parentFullName && (
        <p className="mt-2 text-xs text-muted-foreground">
          <GitFork className="mr-1 inline size-3" />
          Fork de <span className="text-foreground/80">{skill.parentFullName}</span>
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <CurationBadges skill={skill} />
        {tags.map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full font-normal">
            {topicLabel(t)}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/70 pt-3 text-xs text-muted-foreground">
        {skill.language && (
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" />
            {skill.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="size-3" /> {skill.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="size-3" /> {skill.forks}
        </span>
        <span className="ml-auto">Atualizado {formatRelative(skill.updatedAt)}</span>
      </div>
    </article>
  );
}
