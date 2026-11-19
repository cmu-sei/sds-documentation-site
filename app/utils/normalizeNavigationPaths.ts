interface NavigationPathItem {
  path?: string
  children?: NavigationPathItem[]
}

export function normalizeNavigationPaths<T extends NavigationPathItem>(items: T[]): T[] {
  return items.map(item => {
    return {
      ...item,
      path: item.path === undefined ? undefined : addTrailingSlash(item.path),
      children: item.children ? normalizeNavigationPaths(item.children) : undefined
    }
  })
}