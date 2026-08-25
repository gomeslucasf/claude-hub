import { AlertTriangle, Clock, Github, SearchX } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { GitHubApiError, GITHUB_USER } from "@/services/github";

export function SkillCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border bg-card p-4">
      <div className="h-4 w-1/2 rounded bg-surface" />
      <div className="mt-3 h-3 w-full rounded bg-surface" />
      <div className="mt-2 h-3 w-4/5 rounded bg-surface" />
      <div className="mt-5 flex gap-2">
        <div className="h-5 w-16 rounded-full bg-surface" />
        <div className="h-5 w-20 rounded-full bg-surface" />
      </div>
      <div className="mt-4 h-3 w-2/3 rounded bg-surface" />
    </div>
  );
}

export function SkillGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkillCardSkeleton key={i} />
      ))}
    </div>
  );
}

function Shell({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
      <div className="grid size-11 place-items-center rounded-full bg-surface text-muted-foreground">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
      <div className="mt-2 max-w-md text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const isRate = error instanceof GitHubApiError && error.rateLimited;
  const message =
    error instanceof Error ? error.message : "Não foi possível carregar os dados do GitHub.";

  return (
    <Shell
      icon={isRate ? <Clock className="size-5" /> : <AlertTriangle className="size-5" />}
      title={isRate ? "Limite da API do GitHub atingido" : "Falha ao carregar do GitHub"}
    >
      <p>{message}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {onRetry && (
          <Button size="sm" variant="outline" onClick={onRetry}>
            Tentar novamente
          </Button>
        )}
        <Button size="sm" variant="ghost" asChild>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
            <Github className="size-4" /> Ver no GitHub
          </a>
        </Button>
      </div>
    </Shell>
  );
}

export function EmptyState({
  title = "Nenhum conteúdo publicado ainda",
  description = "Os repositórios aparecem aqui assim que recebem o topic claude-skill no GitHub.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Shell icon={<Github className="size-5" />} title={title}>
      <p>{description}</p>
    </Shell>
  );
}

export function NoResultsState({ query }: { query?: string }) {
  return (
    <Shell icon={<SearchX className="size-5" />} title="Nenhum resultado encontrado">
      <p>
        {query ? (
          <>
            Nada corresponde a <span className="text-foreground">“{query}”</span>. Tente outro termo
            ou remova os filtros.
          </>
        ) : (
          "Tente ajustar os filtros aplicados."
        )}
      </p>
    </Shell>
  );
}
