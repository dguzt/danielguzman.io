const pageFiles = Object.keys(import.meta.glob('/src/pages/**/*.astro'));

function toRoute(file: string) {
  const route = file
    .replace(/^\/src\/pages/, '')
    .replace(/\.astro$/, '')
    .replace(/\/index$/, '');
  return route || '/';
}

const builtRoutes = new Set(pageFiles.map(toRoute));

export function isBuilt(href: string) {
  const path = href.length > 1 ? href.replace(/\/+$/, '') : href;
  return builtRoutes.has(path);
}

export function hrefIfBuilt(href: string) {
  return isBuilt(href) ? href : undefined;
}
