import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedSkill } from "@/components/FeaturedSkill";
import { SkillsExplorer, useSkills } from "@/components/SkillsExplorer";
import { SkillCardSkeleton } from "@/components/states";
import { pickFeatured } from "@/lib/taxonomy";
import { GITHUB_USER } from "@/services/github";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucas Gomes — Claude, Skills e Automações com IA" },
      {
        name: "description",
        content:
          "Skills, MCPs, ferramentas, automações e repositórios para explorar Claude e inteligência artificial na prática.",
      },
      { property: "og:title", content: "Lucas Gomes — Claude, Skills e Automações com IA" },
      {
        property: "og:description",
        content:
          "Skills, MCPs, ferramentas e automações para usar Claude e IA no dia a dia — curadoria por Lucas Gomes.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { skills, isPending } = useSkills();
  const featured = pickFeatured(skills);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70">
        <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Curadoria por Lucas Gomes
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            Claude, IA e automações na prática.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Skills, ferramentas e repositórios que ajudam você a usar inteligência artificial para
            automatizar tarefas, trabalhar melhor e explorar todo o potencial do Claude.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/skills">
                Explorar Skills <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
                <Github className="size-4" /> Ver GitHub
              </a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Conteúdo testado, organizado e compartilhado para facilitar sua jornada com IA.
          </p>
        </div>
      </section>

      {(isPending || featured) && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          {isPending ? <SkillCardSkeleton /> : featured && <FeaturedSkill skill={featured} />}
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Últimas Skills</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Atualizado automaticamente a partir dos repositórios com o topic{" "}
              <code className="font-mono text-xs text-primary">claude-skill</code>.
            </p>
          </div>
          <Link
            to="/skills"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            Ver tudo <ArrowRight className="size-4" />
          </Link>
        </div>
        <SkillsExplorer showSort={false} limit={9} />
      </section>
    </>
  );
}
