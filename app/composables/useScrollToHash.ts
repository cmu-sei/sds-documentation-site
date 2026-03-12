// CSS selector special characters that need escaping (e.g. dots in anchor IDs)
const escapedSelector = (hash: string) => {
  if (!hash.startsWith('#')) return hash
  return '#' + CSS.escape(hash.slice(1))
}

export const useScrollToHash = () => {
  const HEADER_OFFSET = 96 // 24 * 4 = 96px (scroll-mt-24)

  const scrollToElement = (hash: string) => {
    const el = document.querySelector(escapedSelector(hash))
    
    if (el) {
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET
      
      window.scrollTo({
        top: offsetPosition,
      })
      return offsetPosition
    }
    
    // If element not found, scroll to top
    window.scrollTo({ top: 0 })
    return 0
  }
  
  return { scrollToElement, HEADER_OFFSET }
}
