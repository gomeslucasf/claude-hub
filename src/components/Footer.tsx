import { Link } from "@tanstack/react-router";
import { GITHUB_USER } from "@/services/github";

export function Footer() {
  return (
    <footer className="border-t border-border/70 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <p>Lucas Gomes — Claude, IA e Automações</p>
        <nav className="flex items-center gap-5">
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <Link to="/sobre" className="transition-colors hover:text-foreground">
            Sobre
          </Link>
          <Link to="/repositorios" className="transition-colors hover:text-foreground">
            Conteúdo
          </Link>
        </nav>
      </div>
    </footer>
  );
}
