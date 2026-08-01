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
]).catch((error) => console.error(error));
