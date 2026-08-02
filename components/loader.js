async function loadComponent(selector, path) {
  const target = document.querySelector(selector);
  if (!target) return;
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Unable to load ${path}`);
  target.outerHTML = await response.text();
}

Promise.all([
  loadComponent('[data-component="header"]', 'components/header.html'),
  loadComponent('[data-component="footer"]', 'components/footer.html')
]).then(() => {
  const header = document.querySelector('.site-header');
  const toggle = header?.querySelector('.menu-toggle');
  const panel = header?.querySelector('.mobile-menu-panel');
  const nav = panel?.querySelector('nav');
  if (!toggle || !panel || !nav) return;
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  panel.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }));
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.focus();
  });
}).catch((error) => console.error(error));
