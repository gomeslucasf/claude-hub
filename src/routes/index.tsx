import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github, Instagram, Sparkles } from "lucide-react";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { SkillRow } from "@/components/SkillRow";
import { GITHUB_USER } from "@/services/github";

const INSTAGRAM_URL = "https://instagram.com/gomeslucasf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucas Gomes — Skills do Claude no seu bolso" },
      {
        name: "description",
        content:
          "Encontre em segundos a skill do Claude que eu mostrei no Instagram: busque pelo nome e abra o passo a passo.",
      },
      { property: "og:title", content: "Lucas Gomes — Skills do Claude no seu bolso" },
      {
        property: "og:description",
        content:
          "Link da bio: busque a skill do Claude que você viu no Instagram e veja como instalar.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Lucas Gomes — Skills do Claude no seu bolso" },
      {
        name: "twitter:description",
        content: "Busque a skill do Claude que você viu no Instagram e veja como usar.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-16 pt-8">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card px-5 py-7 text-center">
        <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary font-display text-2xl font-bold text-primary-foreground">
            L
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight">Lucas Gomes</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Skills, automações e ferramentas para usar o Claude no dia a dia.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Viu no Instagram? Busque a skill abaixo
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium transition-colors active:bg-surface"
            >
              <Instagram className="size-4" /> Instagram
            </a>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-background text-sm font-medium transition-colors active:bg-surface"
            >
              <Github className="size-4" /> GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-lg font-semibold tracking-tight">
          Encontre a skill
        </h2>
        <SkillsExplorer
          renderList={(skills) => (
            <div className="flex flex-col gap-3">
              {skills.map((s) => (
                <SkillRow key={s.id} skill={s} />
              ))}
            </div>
          )}
          showSort={false}
          emptyTitle="Em breve"
          emptyDescription="As skills que eu mostro no Instagram aparecem aqui automaticamente."
        />
      </section>

      <Link
        to="/sobre"
        className="mt-8 flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-4 text-sm transition-colors active:bg-surface"
      >
        Como instalar uma skill no Claude
        <ArrowRight className="size-4 text-muted-foreground" />
      </Link>
    </div>
  );
}
