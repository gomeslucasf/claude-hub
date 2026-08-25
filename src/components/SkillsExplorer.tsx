import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { skillsQuery, type Skill } from "@/services/github";
import { CATEGORIES, filterSkills, SORT_OPTIONS, sortSkills, type SortKey } from "@/lib/taxonomy";
import { SkillCard } from "@/components/SkillCard";
import { EmptyState, ErrorState, NoResultsState, SkillGridSkeleton } from "@/components/states";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function useSkills(requiredTopics: string[] = []) {
  const query = useQuery(skillsQuery());
  const data = useMemo(
    () => (query.data ?? []).filter((s) => requiredTopics.every((t) => s.topics.includes(t))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query.data, requiredTopics.join(",")],
  );
  return { ...query, skills: data };
}

interface Props {
  /** Topics obrigatórios além de `claude-skill` (ex.: mcp, automation). */
  requiredTopics?: string[];
  showFilters?: boolean;
  showSort?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  limit?: number;
  renderList?: (skills: Skill[]) => React.ReactNode;
}

export function SkillsExplorer({
  requiredTopics = [],
  showFilters = true,
  showSort = true,
  emptyTitle,
  emptyDescription,
  limit,
  renderList,
}: Props) {
  const { skills, isPending, isError, error, refetch } = useSkills(requiredTopics);
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("updated");

  const categories = useMemo(() => {
    const present = new Set(skills.flatMap((s) => s.topics));
    return CATEGORIES.filter((c) => present.has(c.topic) && !requiredTopics.includes(c.topic));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills, requiredTopics.join(",")]);

  const results = useMemo(() => {
    const list = sortSkills(filterSkills(skills, search, topic), sort);
    return limit ? list.slice(0, limit) : list;
  }, [skills, search, topic, sort, limit]);

  if (isError) return <ErrorState error={error} onRetry={() => refetch()} />;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar skills, automações ou ferramentas…"
            className="h-10 pl-9"
            aria-label="Buscar"
          />
        </div>
        {showSort && (
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="h-10 w-full sm:w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {showFilters && categories.length > 0 && (
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <FilterChip active={topic === null} onClick={() => setTopic(null)}>
            Todos
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c.topic}
              active={topic === c.topic}
              onClick={() => setTopic(topic === c.topic ? null : c.topic)}
            >
              {c.label}
            </FilterChip>
          ))}
        </div>
      )}

      {isPending ? (
        <SkillGridSkeleton count={limit ?? 6} />
      ) : skills.length === 0 ? (
        <EmptyState {...(emptyTitle ? { title: emptyTitle } : {})} {...(emptyDescription ? { description: emptyDescription } : {})} />
      ) : results.length === 0 ? (
        <NoResultsState query={search} />
      ) : renderList ? (
        renderList(results)
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => (
            <SkillCard key={s.id} skill={s} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active}
      className="shrink-0 rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:border-primary/50 data-[active=true]:bg-primary/12 data-[active=true]:text-primary"
    >
      {children}
    </button>
  );
}
