/** Divide texto en spans .char (compatible con animaciones tipo Splitting / huyml) */
export function splitChars(root: HTMLElement) {
  const walk = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? ''
      if (!text.trim()) return
      const frag = document.createDocumentFragment()
      for (const ch of text) {
        const span = document.createElement('span')
        span.className = ch.trim() ? 'char' : 'char char--space'
        span.textContent = ch === ' ' ? '\u00a0' : ch
        frag.appendChild(span)
      }
      node.parentNode?.replaceChild(frag, node)
      return
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement
      if (el.classList.contains('char')) return
      ;[...el.childNodes].forEach(walk)
    }
  }
  ;[...root.childNodes].forEach(walk)
}
