import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function initGsap() {
  if (registered) return gsap
  gsap.registerPlugin(ScrollTrigger)
  gsap.config({ nullTargetWarn: false })
  registered = true
  return gsap
}

export { gsap, ScrollTrigger }

/** Curvas y duraciones alineadas con huyml.co (GSAP 3.10) */
export const HUYML_EASE = {
  expo: 'expo.inOut',
  power1: 'power1.inOut',
} as const

export const HUYML_DURATION = {
  base: 1.2,
  text: 1.05,
  reveal: 0.85,
  enterDelay: 0.85,
  lottieStart: 0.2,
  /** Pausa en el último frame del drop antes del loop (segundos) */
  dropHold: 0.75,
} as const

export const HUYML_LOTTIE = {
  dropSpeed: 0.58,
} as const

export const HUYML_STAGGER = {
  title: { amount: 0.38, from: 'center' as const },
  chars: { each: 0.04 },
} as const
