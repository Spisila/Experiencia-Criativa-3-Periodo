export function atualizarIconeTema(theme: string) {
  const themeIcon = document.querySelector<HTMLImageElement>('#theme_icon');
  if (!themeIcon) return;

  if (theme === 'light') {
    themeIcon.src = "/node_modules/lucide-static/icons/sun.svg"
  }
  else {
    themeIcon.src = "/node_modules/lucide-static/icons/moon.svg"
  }
}

export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  let newTheme = 'dark';

  if (currentTheme === 'dark') {
    newTheme = 'light';
  }

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  atualizarIconeTema(newTheme);
}

export function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = savedTheme || 'dark';

  document.documentElement.setAttribute('data-theme', systemTheme);

  atualizarIconeTema(systemTheme);
}