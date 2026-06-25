import type { AnimationItem } from 'lottie-web'

export type LottieOpts = {
  loop?: boolean
  autoplay?: boolean
}

type LottieModule = typeof import('lottie-web')

let lottiePromise: Promise<LottieModule['default']> | null = null

async function loadLottie() {
  if (!lottiePromise) {
    lottiePromise = import('lottie-web').then((mod) => mod.default)
  }
  return lottiePromise
}

export async function mountLottie(
  container: HTMLElement,
  path: string,
  { loop = true, autoplay = true }: LottieOpts = {},
): Promise<AnimationItem> {
  const lottie = await loadLottie()
  return lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop,
    autoplay,
    path,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
      progressiveLoad: false,
    },
  })
}

export function destroyLottie(anim: AnimationItem | null) {
  if (!anim) return
  anim.destroy()
}
