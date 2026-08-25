# Resumo e plano de refação do Claude Skills Hub

## Estado atual do projeto

O repositório está em um estado **híbrido e confuso**:

- **Site publicado e funcionando**: pasta `public/` com HTML, CSS e JavaScript puro. É um hub estilo "link na bio", mobile-first, que consome a API do GitHub e filtra repositórios do usuário `gomeslucasf` com o topic `claude-skill`.
- **Restos de uma aplicação React/TanStack Start**: todo o diretório `src/`, `package.json` com dezenas de dependências (React, TanStack, Radix, Tailwind, etc.), `vite.config.ts`, `components.json`, `tsconfig.json` e workflow antigo.

Esses arquivos React não são usados no deploy atual. O GitHub Pages está publicando apenas o conteúdo da pasta `public/` via workflow `.github/workflows/main.yml`.

## O que funciona hoje

- Página única em `public/index.html`.
- Estilos mobile-first em `public/style.css` (tema escuro, visual minimalista).
- Script em `public/app.js` que:
  - Busca repositórios do usuário `gomeslucasf` na GitHub REST API.
  - Filtra apenas os que possuem o topic `claude-skill`.
  - Armazena cache no `localStorage` por 15 minutos.
  - Permite busca em tempo real por nome, descrição e tags.
- Deploy automático para GitHub Pages a cada push na `main`.

## Problemas atuais

- O repositório carrega uma aplicação React completa que não é utilizada, dificultando manutenção.
- `README.md` ainda reflete a versão anterior.
- Não há página de detalhe de uma skill (o link abre direto o GitHub).
- O design pode ser aprimorado para ainda mais foco em mobile/conversão do Instagram.

## Plano de refação proposto

### 1. Limpar o projeto
- Remover todo o diretório `src/`.
- Remover arquivos de configuração do React/TanStack: `package.json`, `vite.config.ts`, `tsconfig.json`, `components.json`, `eslint.config.js`, `.prettierrc`, `.prettierignore`, `bunfig.toml`, `bun.lock`.
- Manter apenas:
  - `.github/workflows/main.yml`
  - `public/` (`index.html`, `style.css`, `app.js`, `favicon.ico`, `robots.txt`)
  - `README.md` (atualizado)
  - `.lovable/project.json`

### 2. Melhorar o site estático
- Revisar `public/index.html` para SEO e meta tags corretas.
- Refinar `public/style.css` para melhor experiência mobile (toques maiores, tipografia mais clara, estados vazios mais amigáveis).
- Evoluir `public/app.js`:
  - Tratar melhor erros de rate limit da API do GitHub.
  - Adicionar indicador de "atualizado em".
  - Melhorar acessibilidade (ARIA labels, foco visível).

### 3. Atualizar documentação
- Reescrever `README.md` para refletir a nova stack simples (HTML/CSS/JS puro) e instruções de desenvolvimento local.

### 4. Validar deploy
- Garantir que o workflow continue gerando `404.html` e `.nojekyll` corretamente.
- Verificar se o site continua publicando em `https://gomeslucasf.github.io/claude-hub/`.

## Resultado esperado

Um repositório enxuto, rápido e fácil de manter: apenas arquivos estáticos, sem build, sem dependências, ideal para um link na bio do Instagram.
