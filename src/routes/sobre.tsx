import { createFileRoute } from "@tanstack/react-router";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/PageHeader";
import { GITHUB_USER } from "@/services/github";

const SOCIALS: { label: string; url?: string }[] = [
  { label: "Instagram" },
  { label: "TikTok" },
  { label: "YouTube" },
  { label: "LinkedIn" },
];

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o hub — Lucas Gomes" },
      {
        name: "description",
        content:
          "Um espaço para organizar e compartilhar Skills, MCPs e automações úteis para quem quer usar o Claude na prática.",
      },
      { property: "og:title", content: "Sobre o hub — Lucas Gomes" },
      {
        property: "og:description",
        content: "Curadoria de Skills, MCPs e ferramentas para usar IA no dia a dia.",
      },
      { property: "og:url", content: "/sobre" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <PageHeader eyebrow="Sobre" title="Curadoria, não currículo" />
      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          Sou Lucas Gomes e uso tecnologia, IA e automação para simplificar processos do dia a dia.
        </p>
        <p>
          Este espaço surgiu para organizar e compartilhar Skills, MCPs, ferramentas e projetos que
          encontro, testo e considero úteis para quem quer explorar o Claude de forma prática.
        </p>
      </div>

      <div className="mt-8">
        <Button asChild>
          <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
            <Github className="size-4" /> Ver meu GitHub
          </a>
        </Button>
      </div>

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Onde mais acompanhar
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {SOCIALS.map((s) =>
            s.url ? (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-border px-3.5 py-1.5 text-sm transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {s.label}
                </a>
              </li>
            ) : (
              <li
                key={s.label}
                className="inline-flex rounded-full border border-dashed border-border px-3.5 py-1.5 text-sm text-muted-foreground/70"
              >
                {s.label} · em breve
              </li>
            ),
          )}
        </ul>
      </section>
    </div>
  );
}
