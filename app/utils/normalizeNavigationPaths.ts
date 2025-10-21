// Helper function to recursively add trailing slashes to navigation items
export function normalizeNavigationPaths(items: unknown[]): unknown[] {
  return items.map((item: unknown) => {
    const navItem = item as { path: string; children?: unknown[] }
    return {
      ...navItem,
      path: addTrailingSlash(navItem.path),
      children: navItem.children ? normalizeNavigationPaths(navItem.children) : undefined
    }
  })
}