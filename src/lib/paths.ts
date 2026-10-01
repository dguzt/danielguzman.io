function withoutTrailingSlash(path: string) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

export function isCurrentPath(currentPath: string, href: string) {
  const current = withoutTrailingSlash(currentPath);
  const target = withoutTrailingSlash(href);
  return target === '/' ? current === '/' : current === target || current.startsWith(`${target}/`);
}
