import { createFileRoute } from "@tanstack/react-router";
import { SkillsExplorer } from "@/components/SkillsExplorer";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/skills/")({
  head: () => ({
    meta: [
      { title: "Skills para Claude — Lucas Gomes" },
      {
        name: "description",
        content:
          "Catálogo de Skills para Claude: automações, MCPs e ferramentas testadas e organizadas por categoria.",
      },
      { property: "og:title", content: "Skills para Claude — Lucas Gomes" },
      {
        property: "og:description",
        content: "Catálogo de Skills para Claude, com busca, filtros e ordenação.",
      },
      { property: "og:url", content: "/skills" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/skills" }],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <PageHeader
        eyebrow="Catálogo"
        title="Skills"
        description="Tudo que foi selecionado para o hub. Busque, filtre por categoria e ordene do jeito que preferir."
      />
      <div className="mt-8">
        <SkillsExplorer />
      </div>
    </div>
  );
}
