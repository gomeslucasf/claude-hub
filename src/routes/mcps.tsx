import { createFileRoute } from "@tanstack/react-router";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/mcps")({
  head: () => ({
    meta: [
      { title: "MCPs para Claude — Lucas Gomes" },
      {
        name: "description",
        content:
          "Servidores e integrações MCP para conectar o Claude a ferramentas, dados e serviços do dia a dia.",
      },
      { property: "og:title", content: "MCPs para Claude — Lucas Gomes" },
      {
        property: "og:description",
        content: "Servidores e integrações MCP selecionados para usar com o Claude.",
      },
      { property: "og:url", content: "/mcps" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/mcps" }],
  }),
  component: McpsPage,
});

function McpsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader
        eyebrow="Integrações"
        title="MCPs"
        description="Model Context Protocol na prática: conecte o Claude a arquivos, APIs e ferramentas que você já usa."
      />
      <div className="mt-8">
        <SkillsExplorer
          requiredTopics={["mcp"]}
          emptyTitle="Nenhum MCP publicado ainda"
          emptyDescription="Repositórios com os topics claude-skill e mcp aparecem automaticamente aqui."
        />
      </div>
    </div>
  );
}
