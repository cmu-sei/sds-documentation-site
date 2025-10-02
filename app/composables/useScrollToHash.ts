export const useScrollToHash = () => {
  const HEADER_OFFSET = 96 // 24 * 4 = 96px (scroll-mt-24)

  const scrollToElement = (hash: string) => {
    const el = document.querySelector(hash)
    
    if (el) {
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_OFFSET
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      return offsetPosition
    }
    
    // If element not found, scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return 0
  }
  
  return { scrollToElement, HEADER_OFFSET }
}
