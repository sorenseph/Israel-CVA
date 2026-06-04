import lottie, { type AnimationItem } from 'lottie-web'

export type LottieOpts = {
  loop?: boolean
  autoplay?: boolean
}

export function mountLottie(
  container: HTMLElement,
  path: string,
  { loop = true, autoplay = true }: LottieOpts = {},
): AnimationItem {
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
