import { Link } from "@tanstack/react-router";
import { ArrowRight, GitFork, Github, Star } from "lucide-react";
import type { Skill } from "@/services/github";
import { formatRelative, topicLabel } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CurationBadges } from "@/components/SkillCard";

export function FeaturedSkill({ skill }: { skill: Skill }) {
  const tags = skill.topics.filter((t) => t !== "claude-skill" && t !== "featured");
  const category = tags[0];

  return (
    <article className="rounded-2xl border border-border bg-card p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-primary/12 px-2.5 py-1 font-medium text-primary">
          Em destaque
        </span>
        {category && <span className="text-muted-foreground">{topicLabel(category)}</span>}
      </div>

      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        {skill.name}
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {skill.description ?? "Sem descrição."}
      </p>

      {skill.isFork && skill.parentFullName && (
        <p className="mt-3 text-xs text-muted-foreground">
          <GitFork className="mr-1 inline size-3" />
          Fork de{" "}
          <a
            href={skill.parentUrl ?? skill.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2"
          >
            {skill.parentFullName}
          </a>
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <CurationBadges skill={skill} />
        {tags.slice(0, 5).map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full font-normal">
            {topicLabel(t)}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        {skill.language && (
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" /> {skill.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="size-3" /> {skill.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="size-3" /> {skill.forks}
        </span>
        <span>Atualizado {formatRelative(skill.updatedAt)}</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/skills/$repo" params={{ repo: skill.slug }}>
            Ver Skill <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <a href={skill.htmlUrl} target="_blank" rel="noreferrer">
            <Github className="size-4" /> GitHub
          </a>
        </Button>
      </div>
    </article>
  );
}
