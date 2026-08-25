import { Link } from "@tanstack/react-router";
import { Github, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { GITHUB_USER } from "@/services/github";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/skills", label: "Skills" },
  { to: "/mcps", label: "MCPs" },
  { to: "/automacoes", label: "Automações" },
  { to: "/repositorios", label: "Repositórios" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid size-7 place-items-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground">
            L
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">Lucas Gomes</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
              activeProps={{ className: "!text-foreground bg-surface" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Alternar tema">
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
              <Github className="size-4" /> GitHub
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground"
              activeProps={{ className: "!text-foreground bg-surface" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`https://github.com/${GITHUB_USER}`}
            target="_blank"
            rel="noreferrer"
            className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground"
          >
            GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
