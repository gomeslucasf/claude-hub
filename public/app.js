const GITHUB_USER = 'gomeslucasf';
const REQUIRED_TOPIC = 'claude-skill';
const CACHE_KEY = 'claude-skills-cache';
const CACHE_TTL = 15 * 60 * 1000; // 15 minutos

const elements = {
  search: document.getElementById('search'),
  list: document.getElementById('skills-list'),
  loading: document.getElementById('loading'),
  empty: document.getElementById('empty'),
  error: document.getElementById('error'),
  errorMessage: document.getElementById('error-message'),
  year: document.getElementById('year'),
};

let allSkills = [];

function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(num);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getCachedSkills() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CACHE_TTL) return null;
    return parsed.skills;
  } catch {
    return null;
  }
}

function setCachedSkills(skills) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), skills }));
  } catch {}
}

async function fetchAllRepos() {
  const url = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github.mercy-preview+json' },
  });

  if (!response.ok) {
    throw new Error(`GitHub respondeu ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

function filterSkills(repos) {
  return repos
    .filter((repo) => repo.topics && repo.topics.includes(REQUIRED_TOPIC))
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || '',
      url: repo.html_url,
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      language: repo.language || '',
      topics: repo.topics.filter((t) => t !== REQUIRED_TOPIC),
      updatedAt: repo.updated_at,
    }))
    .sort((a, b) => b.stars - a.stars);
}

function renderSkills(skills) {
  elements.list.innerHTML = '';

  if (skills.length === 0) {
    elements.list.classList.add('hidden');
    elements.empty.classList.remove('hidden');
    return;
  }

  elements.empty.classList.add('hidden');
  elements.list.classList.remove('hidden');

  const fragment = document.createDocumentFragment();

  for (const skill of skills) {
    const li = document.createElement('li');
    const tagsHtml = skill.topics
      .slice(0, 4)
      .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join('');

    li.innerHTML = `
      <a href="${escapeHtml(skill.url)}" target="_blank" rel="noopener" class="skill-card">
        <div class="skill-header">
          <h2 class="skill-title">${escapeHtml(skill.name)}</h2>
          <div class="skill-meta">
            ${skill.stars > 0 ? `<span>★ ${formatNumber(skill.stars)}</span>` : ''}
            ${skill.language ? `<span>${escapeHtml(skill.language)}</span>` : ''}
          </div>
        </div>
        ${skill.description ? `<p class="skill-description">${escapeHtml(skill.description)}</p>` : ''}
        ${tagsHtml ? `<div class="skill-tags">${tagsHtml}</div>` : ''}
      </a>
    `;
    fragment.appendChild(li);
  }

  elements.list.appendChild(fragment);
}

function setVisibility(state, visible) {
  if (visible) state.classList.remove('hidden');
  else state.classList.add('hidden');
}

function filterBySearch(query) {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return allSkills;
  return allSkills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(normalized) ||
      skill.description.toLowerCase().includes(normalized) ||
      skill.topics.some((tag) => tag.toLowerCase().includes(normalized))
  );
}

async function init() {
  elements.year.textContent = new Date().getFullYear();

  elements.search.addEventListener('input', (e) => {
    const filtered = filterBySearch(e.target.value);
    renderSkills(filtered);
  });

  try {
    const cached = getCachedSkills();
    if (cached) {
      allSkills = cached;
      setVisibility(elements.loading, false);
      renderSkills(allSkills);
      // Atualiza em background
      fetchAllRepos()
        .then((repos) => {
          allSkills = filterSkills(repos);
          setCachedSkills(allSkills);
          if (!elements.search.value.trim()) renderSkills(allSkills);
        })
        .catch(() => {});
      return;
    }

    const repos = await fetchAllRepos();
    allSkills = filterSkills(repos);
    setCachedSkills(allSkills);
    setVisibility(elements.loading, false);
    renderSkills(allSkills);
  } catch (err) {
    setVisibility(elements.loading, false);
    setVisibility(elements.error, true);
    elements.errorMessage.textContent = err.message || 'Tente novamente mais tarde.';
  }
}

init();
