import { createFileRoute } from "@tanstack/react-router";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/automacoes")({
  head: () => ({
    meta: [
      { title: "Automações com IA — Lucas Gomes" },
      {
        name: "description",
        content:
          "Automações prontas para usar com Claude: fluxos, scripts e agentes que economizam tempo no dia a dia.",
      },
      { property: "og:title", content: "Automações com IA — Lucas Gomes" },
      {
        property: "og:description",
        content: "Fluxos, scripts e agentes para automatizar tarefas com o Claude.",
      },
      { property: "og:url", content: "/automacoes" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/automacoes" }],
  }),
  component: AutomacoesPage,
});

function AutomacoesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader
        eyebrow="Mão na massa"
        title="Automações"
        description="Projetos focados em automatizar tarefas repetitivas — de organização de arquivos a agentes que trabalham por você."
      />
      <div className="mt-8">
        <SkillsExplorer
          requiredTopics={["automation"]}
          emptyTitle="Nenhuma automação publicada ainda"
          emptyDescription="Repositórios com os topics claude-skill e automation aparecem automaticamente aqui."
        />
      </div>
    </div>
  );
}
