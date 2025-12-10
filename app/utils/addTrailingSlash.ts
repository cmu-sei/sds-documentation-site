/**
 * Ensures a path has a trailing slash
 * This prevents server redirects when accessing directory-based routes
 */
export function addTrailingSlash(path: string): string {
  if (!path || path === '/') return path
  return path.endsWith('/') ? path : `${path}/`
}
