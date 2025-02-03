import type { Toc } from "@nuxt/content";

export function useToc() {
  return useState<Toc | undefined>('toc')
}