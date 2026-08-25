import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, GitFork, Github, Scale, Star } from "lucide-react";
import { readmeQuery, skillQuery } from "@/services/github";
import { curationBadges, formatRelative, topicLabel } from "@/lib/taxonomy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/states";

export const Route = createFileRoute("/skills/$repo")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.repo} — Skill para Claude | Lucas Gomes` },
      {
        name: "description",
        content: `Detalhes da Skill ${params.repo}: para que serve, categorias, licença e link para o repositório no GitHub.`,
      },
      { property: "og:title", content: `${params.repo} — Skill para Claude` },
      {
        property: "og:description",
        content: `Detalhes, categorias e repositório original da Skill ${params.repo}.`,
      },
      { property: "og:url", content: `/skills/${params.repo}` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `/skills/${params.repo}` }],
  }),
  component: SkillDetail,
});

function SkillDetail() {
  const { repo } = Route.useParams();
  const skill = useQuery(skillQuery(repo));
  const readme = useQuery({ ...readmeQuery(repo), enabled: skill.isSuccess });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        to="/skills"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Voltar para Skills
      </Link>

      {skill.isPending && (
        <div className="mt-8 animate-pulse space-y-4">
          <div className="h-9 w-2/3 rounded bg-surface" />
          <div className="h-4 w-full rounded bg-surface" />
          <div className="h-4 w-3/4 rounded bg-surface" />
          <div className="h-40 w-full rounded-xl bg-surface" />
        </div>
      )}

      {skill.isError && (
        <div className="mt-8">
          <ErrorState error={skill.error} onRetry={() => skill.refetch()} />
        </div>
      )}

      {skill.data && (
        <article className="mt-6">
          <div className="flex flex-wrap items-center gap-1.5">
            {curationBadges(skill.data).map((b) => (
              <span
                key={b.topic}
                className="rounded-full border border-primary/40 px-2 py-0.5 text-[11px] font-medium text-primary"
              >
                {b.label}
              </span>
            ))}
          </div>

          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {skill.data.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {skill.data.description ?? "Sem descrição."}
          </p>

          {skill.data.isFork && skill.data.parentFullName && (
            <div className="mt-4 rounded-lg border border-border bg-surface px-4 py-3 text-sm">
              <GitFork className="mr-1.5 inline size-4 text-muted-foreground" />
              Fork de{" "}
              <a
                href={skill.data.parentUrl ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-2"
              >
                {skill.data.parentFullName}
              </a>
              {skill.data.parentOwner && (
                <span className="text-muted-foreground"> — criado por {skill.data.parentOwner}</span>
              )}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-1.5">
            {skill.data.topics
              .filter((t) => t !== "claude-skill" && t !== "featured")
              .map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full font-normal">
                  {topicLabel(t)}
                </Badge>
              ))}
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            <Meta label="Estrelas" value={String(skill.data.stars)} icon={<Star className="size-3.5" />} />
            <Meta label="Forks" value={String(skill.data.forks)} icon={<GitFork className="size-3.5" />} />
            <Meta label="Linguagem" value={skill.data.language ?? "—"} />
            <Meta label="Atualizado" value={formatRelative(skill.data.updatedAt)} />
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild>
              <a href={skill.data.htmlUrl} target="_blank" rel="noreferrer">
                <Github className="size-4" /> Ver no GitHub
              </a>
            </Button>
            {skill.data.parentUrl && (
              <Button variant="outline" asChild>
                <a href={skill.data.parentUrl} target="_blank" rel="noreferrer">
                  <GitFork className="size-4" /> Repositório original
                </a>
              </Button>
            )}
            {skill.data.homepage && (
              <Button variant="outline" asChild>
                <a href={skill.data.homepage} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-4" /> Site
                </a>
              </Button>
            )}
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Scale className="size-3.5" />
            Licença: {skill.data.license ?? "não informada"} · Criado em{" "}
            {new Date(skill.data.createdAt).toLocaleDateString("pt-BR")}
          </p>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Sobre esta Skill</h2>
            <div className="mt-4 rounded-xl border border-border bg-card p-5">
              {readme.isPending && (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 w-1/3 rounded bg-surface" />
                  <div className="h-3 w-full rounded bg-surface" />
                  <div className="h-3 w-5/6 rounded bg-surface" />
                </div>
              )}
              {readme.isError && (
                <p className="text-sm text-muted-foreground">
                  Não foi possível carregar o README agora. Consulte o repositório no GitHub.
                </p>
              )}
              {readme.isSuccess &&
                (readme.data ? (
                  // HTML já sanitizado pela própria API do GitHub
                  <div
                    className="readme-prose"
                    dangerouslySetInnerHTML={{ __html: readme.data }}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Este repositório ainda não possui README.
                  </p>
                ))}
            </div>
          </section>
        </article>
      )}
    </div>
  );
}

function Meta({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-card px-4 py-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 flex items-center gap-1.5 text-sm font-medium">
        {icon}
        {value}
      </dd>
    </div>
  );
}
