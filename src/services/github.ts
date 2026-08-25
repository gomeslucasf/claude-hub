/**
 * Camada isolada de acesso à GitHub REST API.
 * Nenhum componente deve chamar fetch diretamente — tudo passa por aqui.
 */

export const GITHUB_USER = "gomeslucasf";
export const CURATION_TOPIC = "claude-skill";
export const FEATURED_TOPIC = "featured";

const API_BASE = "https://api.github.com";

export interface GitHubLicense {
  key: string;
  name: string;
  spdx_id: string | null;
}

export interface GitHubRepoRaw {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  fork: boolean;
  archived: boolean;
  license: GitHubLicense | null;
  owner: { login: string; html_url: string; avatar_url: string };
  parent?: {
    full_name: string;
    html_url: string;
    owner: { login: string; html_url: string };
  };
  source?: {
    full_name: string;
    html_url: string;
    owner: { login: string; html_url: string };
  };
}

export interface Skill {
  id: number;
  name: string;
  slug: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  createdAt: string;
  isFork: boolean;
  parentFullName: string | null;
  parentUrl: string | null;
  parentOwner: string | null;
  license: string | null;
  owner: string;
  featured: boolean;
}

export class GitHubApiError extends Error {
  status: number;
  rateLimited: boolean;

  constructor(message: string, status: number, rateLimited = false) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
    this.rateLimited = rateLimited;
  }
}

async function ghFetch<T>(path: string, accept = "application/vnd.github+json"): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: accept, "X-GitHub-Api-Version": "2022-11-28" },
    });
  } catch {
    throw new GitHubApiError("Não foi possível conectar à API do GitHub.", 0);
  }

  if (!res.ok) {
    const remaining = res.headers.get("x-ratelimit-remaining");
    const rateLimited = (res.status === 403 || res.status === 429) && remaining === "0";
    const body = await res.text();
    throw new GitHubApiError(
      rateLimited
        ? "Limite de requisições da API do GitHub atingido. Tente novamente em alguns minutos."
        : `Erro na API do GitHub (${res.status}): ${body.slice(0, 200)}`,
      res.status,
      rateLimited,
    );
  }

  if (accept.includes("html")) {
    return (await res.text()) as unknown as T;
  }
  return (await res.json()) as T;
}

export function mapRepo(repo: GitHubRepoRaw): Skill {
  const parent = repo.parent ?? repo.source ?? null;
  const topics = repo.topics ?? [];
  return {
    id: repo.id,
    name: repo.name,
    slug: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    htmlUrl: repo.html_url,
    homepage: repo.homepage && repo.homepage.trim() !== "" ? repo.homepage : null,
    topics,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.pushed_at ?? repo.updated_at,
    createdAt: repo.created_at,
    isFork: repo.fork,
    parentFullName: parent?.full_name ?? null,
    parentUrl: parent?.html_url ?? null,
    parentOwner: parent?.owner?.login ?? null,
    license: repo.license?.spdx_id ?? repo.license?.name ?? null,
    owner: repo.owner.login,
    featured: topics.includes(FEATURED_TOPIC),
  };
}

/** Repositórios públicos curados (somente com o topic `claude-skill`). */
export async function fetchSkills(): Promise<Skill[]> {
  const repos = await ghFetch<GitHubRepoRaw[]>(
    `/users/${GITHUB_USER}/repos?per_page=100&sort=pushed&direction=desc&type=owner`,
  );

  return repos
    .filter((r) => (r.topics ?? []).includes(CURATION_TOPIC))
    .map(mapRepo)
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

/** Detalhe de um repositório (inclui `parent` quando é fork). */
export async function fetchSkill(slug: string): Promise<Skill> {
  const repo = await ghFetch<GitHubRepoRaw>(`/repos/${GITHUB_USER}/${slug}`);
  if (!(repo.topics ?? []).includes(CURATION_TOPIC)) {
    throw new GitHubApiError("Este repositório não faz parte da curadoria.", 404);
  }
  return mapRepo(repo);
}

/** README já renderizado e sanitizado pelo próprio GitHub. */
export async function fetchReadmeHtml(slug: string): Promise<string | null> {
  try {
    return await ghFetch<string>(
      `/repos/${GITHUB_USER}/${slug}/readme`,
      "application/vnd.github.html+json",
    );
  } catch (e) {
    if (e instanceof GitHubApiError && e.status === 404) return null;
    throw e;
  }
}

/* ---------------- Query options (React Query) ---------------- */

const STALE = 1000 * 60 * 15; // 15 min de cache — dados não mudam a cada segundo

export const skillsQuery = () => ({
  queryKey: ["skills"] as const,
  queryFn: fetchSkills,
  staleTime: STALE,
  gcTime: STALE * 4,
  retry: 1,
});

export const skillQuery = (slug: string) => ({
  queryKey: ["skill", slug] as const,
  queryFn: () => fetchSkill(slug),
  staleTime: STALE,
  retry: 1,
});

export const readmeQuery = (slug: string) => ({
  queryKey: ["readme", slug] as const,
  queryFn: () => fetchReadmeHtml(slug),
  staleTime: STALE,
  retry: 1,
});
