# Claude Skills Hub

Hub público e mobile-first para compartilhar skills, automações e ferramentas relacionadas ao **Claude IA**.

Acesse em: `https://gomeslucasf.github.io/claude-hub/`

## Propósito

Página estilo "link na bio" para ser usada no Instagram. Quem segue o perfil acessa o link e encontra as skills publicadas de forma rápida e direta.

## Como funciona

- O site é **estático**: HTML, CSS e JavaScript puro.
- A lista de skills é carregada diretamente da **GitHub REST API** no navegador.
- São exibidos apenas repositórios do usuário `gomeslucasf` que possuam o topic `claude-skill`.
- A busca funciona no front-end, filtrando nome, descrição e tags.
- Os resultados são cacheados no `localStorage` por 15 minutos.

## Estrutura

```
public/
├── index.html   # Estrutura da página
├── style.css    # Estilos mobile-first
└── app.js       # Busca na GitHub API e renderização
```

## Deploy

O deploy é feito automaticamente via **GitHub Actions** para o **GitHub Pages** sempre que há push na branch `main`.

O workflow está em `.github/workflows/main.yml` e publica o conteúdo da pasta `public/`.

## Desenvolvimento local

Para visualizar o site localmente:

```bash
python3 -m http.server 8080 --directory public
```

Depois acesse `http://localhost:8080`.

## Personalização

- **Usuário GitHub**: altere a constante `GITHUB_USER` em `public/app.js`.
- **Topic obrigatório**: altere a constante `REQUIRED_TOPIC` em `public/app.js`.
- **Instagram**: altere o link no botão em `public/index.html`.
