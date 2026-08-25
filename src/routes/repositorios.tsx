import { createFileRoute, Link } from "@tanstack/react-router";
import { GitFork, Star } from "lucide-react";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { PageHeader } from "@/components/PageHeader";
import { formatRelative } from "@/lib/taxonomy";

export const Route = createFileRoute("/repositorios")({
  head: () => ({
    meta: [
      { title: "Repositórios curados — Lucas Gomes" },
      {
        name: "description",
        content:
          "Diretório técnico com todos os repositórios curados do hub: Skills, MCPs, automações e ferramentas para Claude.",
      },
      { property: "og:title", content: "Repositórios curados — Lucas Gomes" },
      {
        property: "og:description",
        content: "Listagem completa dos repositórios selecionados via topic claude-skill.",
      },
      { property: "og:url", content: "/repositorios" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/repositorios" }],
  }),
  component: RepositoriosPage,
});

function RepositoriosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader
        eyebrow="Diretório"
        title="Repositórios"
        description="Visão técnica e completa de tudo que está publicado no hub, direto da API do GitHub."
      />
      <div className="mt-8">
        <SkillsExplorer
          renderList={(skills) => (
            <ul className="divide-y divide-border rounded-xl border border-border bg-card">
              {skills.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/skills/$repo"
                    params={{ repo: s.slug }}
                    className="flex flex-col gap-1 px-4 py-3.5 transition-colors hover:bg-surface sm:flex-row sm:items-center sm:gap-4"
                  >
                    <span className="font-mono text-sm font-medium">{s.name}</span>
                    <span className="line-clamp-1 flex-1 text-sm text-muted-foreground">
                      {s.description ?? "Sem descrição."}
                    </span>
                    <span className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                      {s.language && <span>{s.language}</span>}
                      <span className="flex items-center gap-1">
                        <Star className="size-3" />
                        {s.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="size-3" />
                        {s.forks}
                      </span>
                      <span className="hidden sm:inline">{formatRelative(s.updatedAt)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        />
      </div>
    </div>
  );
}
