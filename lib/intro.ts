// Tiny shared signal so the hero waits for the intro curtain before it starts typing.
let done = false
const listeners = new Set<() => void>()

export function markIntroDone() {
  if (done) return
  done = true
  listeners.forEach((listener) => listener())
  listeners.clear()
}

export function onIntroDone(callback: () => void) {
  if (done) {
    callback()
    return () => {}
  }
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
