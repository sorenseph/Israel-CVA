import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenis: Lenis | null = null

export function initLenis() {
  if (lenis) return lenis

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 768px)').matches

  if (prefersReduced || isMobile) {
    return null
  }

  document.documentElement.classList.add('lenis', 'lenis-smooth')

  lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    syncTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const raf = (time: number) => {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}

export function getLenis() {
  return lenis
}

export function destroyLenis() {
  lenis?.destroy()
  lenis = null
}
