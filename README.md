# Claude Hub

Crie um site moderno, rápido e responsivo para funcionar como um hub público de repositórios, skills, automações e ferramentas relacionadas ao Claude IA.

O site será vinculado ao perfil GitHub:

https://github.com/gomeslucasf

O objetivo é transformar esse site em uma espécie de rede social / catálogo pessoal de curadoria, onde serão exibidos apenas os novos repositórios que eu decidir compartilhar daqui para frente.

O foco principal não é funcionar como portfólio profissional tradicional.

A proposta é:

“Claude, IA e automações na prática.”

O site deve ser voltado principalmente para pessoas que querem aprender a usar Claude, Claude Code, MCPs, Skills, agentes e automações no dia a dia, incluindo usuários não técnicos.

Objetivo do projeto

Criar um hub onde eu possa:

compartilhar Skills para Claude;

compartilhar forks de repositórios úteis;

recomendar ferramentas;

organizar automações por categoria;

facilitar a descoberta de projetos;

direcionar usuários para os repositórios no GitHub;

posteriormente conectar conteúdos de redes sociais;

construir autoridade em torno de Claude IA e automações.

Stack

Utilize:

React;

TypeScript;

Tailwind CSS;

shadcn/ui;

GitHub REST API;

aplicação compatível com GitHub Pages.

Não utilizar backend na V1.

Não utilizar:

Supabase;

banco de dados;

n8n;

autenticação;

servidor próprio.

Toda informação pública dos repositórios deve vir da GitHub API.

Regra principal dos repositórios

Consultar os repositórios públicos do usuário:

gomeslucasf

Porém, NÃO exibir todos os repositórios.

Exibir SOMENTE repositórios que possuam o GitHub Topic:

claude-skill

Essa regra é obrigatória.

Todos os repositórios antigos que não possuírem esse Topic devem ser completamente ignorados pelo site.

Isso será utilizado como mecanismo de curadoria.

Fluxo:

Eu faço fork ou crio um novo repositório.

Depois adiciono:

claude-skill

Automaticamente o site passa a reconhecer esse repositório como conteúdo válido.

Dados que devem ser recuperados do GitHub

Para cada repositório recuperar, quando disponível:

nome;

descrição;

URL;

Topics;

linguagem principal;

número de estrelas;

número de forks;

data da última atualização;

data de criação;

indicação se é um fork;

proprietário original;

link para o repositório original;

homepage;

licença;

README, quando fizer sentido.

Ordenar inicialmente pelos repositórios atualizados mais recentemente.

Conceito visual

Não criar um visual de “currículo de desenvolvedor”.

Evitar elementos clichês como:

“Olá, sou Lucas Gomes, desenvolvedor Full Stack.”

A identidade deve parecer mais com uma plataforma de descoberta de conteúdo sobre IA.

Referências conceituais:

Product Hunt;

GitHub;

Linear;

Vercel;

Raycast;

sites de ferramentas de IA;

diretórios modernos de produtos.

O design deve ser:

minimalista;

tecnológico;

elegante;

limpo;

bastante responsivo;

com ótima experiência mobile.

Priorizar legibilidade e navegação rápida.

Header

Criar um header simples com:

Logo / nome:

Lucas Gomes

Menu:

Início

Skills

MCPs

Automações

Repositórios

Sobre

No lado direito:

botão GitHub;

botão ou ícone para alternar tema claro/escuro.

O header deve permanecer discreto.

Hero da Home

Headline principal:

“Claude, IA e automações na prática.”

Subheadline:

“Skills, ferramentas e repositórios que ajudam você a usar inteligência artificial para automatizar tarefas, trabalhar melhor e explorar todo o potencial do Claude.”

CTAs:

“Explorar Skills”

“Ver GitHub”

Adicionar abaixo alguma informação discreta como:

“Curadoria por Lucas Gomes”

ou:

“Conteúdo testado, organizado e compartilhado para facilitar sua jornada com IA.”

Não exagerar em textos.

Área de destaque

Criar uma área:

“Em destaque”

Mostrar um repositório/skill em evidência.

Card maior contendo:

nome;

descrição;

categoria;

tags;

estrelas;

linguagem;

última atualização;

botão “Ver Skill”;

botão “GitHub”.

Caso não exista regra automática de destaque, utilizar o repositório mais recentemente atualizado.

Preparar a arquitetura para futuramente permitir um Topic:

featured

Caso exista, priorizar estes repositórios como destaque.

Feed principal

Criar seção:

“Últimas Skills”

Mostrar cards dos repositórios retornados pela API.

Cada card deve conter:

nome;

descrição;

tags;

linguagem;

estrelas;

forks;

data da última atualização;

indicação de fork, quando aplicável;

botão para abrir o repositório.

Design compacto.

Não criar cards exageradamente grandes.

Categorias

Utilizar os Topics adicionais do GitHub para classificação.

Inicialmente considerar:

productivity;

automation;

documents;

coding;

research;

mcp;

beginner.

Mapear para nomes amigáveis:

productivity → Produtividade

automation → Automação

documents → Documentos

coding → Desenvolvimento

research → Pesquisa

mcp → MCP

beginner → Para iniciantes

Criar filtros clicáveis.

Exemplo:

Todos | Claude Code | MCP | Automação | Produtividade | Desenvolvimento | Pesquisa

Os filtros devem funcionar no front-end sem recarregar a página.

Busca

Adicionar busca por:

nome;

descrição;

Topics.

Placeholder:

“Buscar skills, automações ou ferramentas…”

Página Skills

Criar uma página/listagem dedicada.

URL:

/skills

Mostrar todos os repositórios que possuírem:

claude-skill

Permitir:

busca;

filtros;

ordenação.

Ordenações:

Mais recentes

Mais atualizados

Mais populares

Página individual

Criar uma rota:

/skills/:repo

Exemplo:

/skills/browser-automation

Essa página deve apresentar:

nome da Skill;

descrição;

tags;

linguagem;

estrelas;

forks;

última atualização;

link para GitHub;

link para repositório original;

licença;

autor original.

Se for possível recuperar o README através da GitHub API sem comprometer performance ou compatibilidade com GitHub Pages, criar uma área:

“Sobre esta Skill”

Renderizar o conteúdo do README de forma segura.

Não precisa reproduzir toda a experiência do GitHub.

Identificação de Forks

Como boa parte do conteúdo será fork de projetos interessantes, deixar isso transparente.

Mostrar algo como:

“Fork de nome-do-repositorio”

E permitir acesso ao projeto original.

Não apresentar o fork como se fosse criação própria.

Curadoria

Preparar visualmente os cards para futuramente mostrar status como:

“Testado por mim”

“Recomendado”

“Para iniciantes”

“Avançado”

Na V1, “Para iniciantes” pode ser identificado através do Topic:

beginner

Preparar suporte futuro para:

tested

recommended

advanced

Esses Topics podem virar badges automaticamente.

Página MCPs

URL:

/mcps

Filtrar repositórios que possuírem:

claude-skill

e também:

mcp

Exibir apenas esse subconjunto.

Página Automações

URL:

/automacoes

Filtrar:

claude-skill

automation

Página Repositórios

URL:

/repositorios

Exibir a listagem completa de conteúdos selecionados através do Topic claude-skill.

Essa página pode apresentar visual mais próximo de um diretório técnico.

Sobre

Criar seção curta.

Não transformar em currículo.

Texto conceitual:

“Sou Lucas Gomes e uso tecnologia, IA e automação para simplificar processos do dia a dia.

Este espaço surgiu para organizar e compartilhar Skills, MCPs, ferramentas e projetos que encontro, testo e considero úteis para quem quer explorar o Claude de forma prática.”

Adicionar botão:

“Ver meu GitHub”

Preparar espaço para links de:

Instagram;

TikTok;

YouTube;

LinkedIn.

Não é necessário preencher links que não forem fornecidos.

Rodapé

Rodapé simples.

Exemplo:

“Lucas Gomes — Claude, IA e Automações”

GitHub

Sobre

Conteúdo

Não utilizar rodapé grande.

Responsividade

Prioridade alta para mobile.

A maior parte do conteúdo poderá ser acessada por pessoas vindo de redes sociais.

No mobile:

cards em uma coluna;

filtros com scroll horizontal;

header simplificado;

busca ocupando largura disponível;

botões facilmente clicáveis.

Tema

Criar suporte completo para:

Dark Mode;

Light Mode.

Preferir dark como tema visual principal, mas respeitar preferência do sistema do usuário.

Visual moderno, com contraste adequado.

Não utilizar excesso de gradientes.

Não utilizar efeitos neon exagerados.

Estados da interface

Criar estados apropriados para:

loading;

erro da GitHub API;

nenhum repositório encontrado;

nenhum resultado da busca;

rate limit da API.

Não deixar a tela quebrar caso a API fique indisponível.

GitHub API

Criar uma camada isolada para consumir a GitHub API.

Não espalhar chamadas HTTP diretamente pelos componentes.

Estrutura sugerida:

src/services/github.ts

ou equivalente.

Toda a aplicação deve utilizar essa camada.

Criar tipos TypeScript adequados.

Cache

Como os dados não precisam ser atualizados a cada segundo, implementar cache no front-end quando possível.

Pode utilizar:

React Query;

cache local;

estratégia equivalente.

Evitar chamadas desnecessárias para a API.

GitHub Pages

O projeto precisa funcionar corretamente quando hospedado em GitHub Pages.

Considerar:

base path;

assets;

roteamento;

refresh em rotas internas;

build;

deploy.

Preparar configuração para deploy via GitHub Actions.

Criar workflow para:

build → deploy GitHub Pages.

O site inicialmente poderá ser publicado em algo como:

https://gomeslucasf.github.io/

ou em um repositório específico, conforme a configuração escolhida.

SEO

Criar SEO básico.

Title:

“Lucas Gomes — Claude, Skills e Automações com IA”

Description:

“Skills, MCPs, ferramentas, automações e repositórios para explorar Claude e inteligência artificial na prática.”

Open Graph.

Twitter Card.

Favicon simples.

URLs amigáveis.

Arquitetura futura

Mesmo sendo uma V1 simples, estruturar o projeto para futuramente receber:

tutoriais;

vídeos;

artigos;

comentários;

avaliações;

newsletter;

favoritos;

integração com redes sociais;

analytics.

Não implementar essas funcionalidades agora.

Somente evitar uma estrutura que dificulte adicioná-las posteriormente.

Importante

Não adicionar dados fictícios como se fossem conteúdos reais.

Se a API não retornar nenhum repositório com claude-skill, mostrar um estado vazio elegante.

Pode utilizar mock apenas durante desenvolvimento, mas a versão final deve consumir os dados reais do GitHub.

O principal conceito do projeto deve permanecer:

GitHub = fonte dos conteúdos.

Topic claude-skill = autorização para aparecer no site.

Site = camada de descoberta, organização e curadoria.

Resultado esperado

Quero que o resultado pareça uma pequena plataforma de conteúdo de IA e não simplesmente uma página listando repositórios do GitHub.

O visitante precisa conseguir chegar pelo Instagram, TikTok ou outra rede social e rapidamente entender:

o que é o site;

o que ele pode encontrar ali;

quais Skills estão disponíveis;

para que cada Skill serve;

onde acessar o projeto original;

qual conteúdo é recomendado ou voltado para iniciantes.

Comece criando a arquitetura, componentes e Home da aplicação seguindo essas regras.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bb0f1e28-6d60-44a7-af09-0627b7012356).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
