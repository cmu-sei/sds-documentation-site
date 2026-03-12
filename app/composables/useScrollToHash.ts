const stripHashPrefix = (hash: string) => hash.startsWith('#') ? hash.slice(1) : hash

const decodeHash = (value: string) => {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const getElementFromHash = (hash: string) => {
  const rawId = stripHashPrefix(hash)
  if (!rawId) return null

  const decodedId = decodeHash(rawId)

  // Fast path: direct id lookup handles most cases and avoids selector escaping pitfalls.
  const byDecodedId = document.getElementById(decodedId)
  if (byDecodedId) return byDecodedId

  const byRawId = document.getElementById(rawId)
  if (byRawId) return byRawId

  // Fallback to escaped selectors for ids with selector-special characters.
  const selectorId = typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
    ? CSS.escape(decodedId)
    : decodedId

  const byEscapedDecoded = document.querySelector(`#${selectorId}`)
  if (byEscapedDecoded) return byEscapedDecoded

  if (decodedId !== rawId) {
    const rawSelectorId = typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
      ? CSS.escape(rawId)
      : rawId

    return document.querySelector(`#${rawSelectorId}`)
  }

  return null
}

export const useScrollToHash = () => {
  const HEADER_OFFSET = 96 // 24 * 4 = 96px (scroll-mt-24)

  const scrollToElement = (hash: string) => {
    const el = getElementFromHash(hash)
    
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
