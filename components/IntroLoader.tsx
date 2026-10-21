'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { markIntroDone, prefersReducedMotion } from '@/lib/intro'
import { LogoMark } from '@/components/ui/Logo'

const REV_MS = 1500
const LIFT_MS = 800

/**
 * First-visit intro: the logo and a rev-counter style bar fill up, then the
 * black and blue curtains lift to reveal the hero. Shown once per browser session.
 */
export default function IntroLoader() {
  const [phase, setPhase] = useState<'revving' | 'lifting' | 'gone'>('revving')
  const [progress, setProgress] = useState(0)
  const timers = useRef<number[]>([])

  const lift = () => {
    timers.current.forEach(clearTimeout)
    setProgress(100)
    setPhase('lifting')
    markIntroDone()
    try {
      sessionStorage.setItem('intro-seen', '1')
    } catch {
      // Storage can be blocked; the intro simply plays again next time.
    }
    timers.current = [
      window.setTimeout(() => {
        setPhase('gone')
        document.body.style.overflow = ''
      }, LIFT_MS),
    ]
  }

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem('intro-seen') === '1'
    } catch {
      // Storage can be blocked; fall through and play the intro.
    }

    if (seen || prefersReducedMotion()) {
      setPhase('gone')
      markIntroDone()
      return
    }

    document.body.style.overflow = 'hidden'

    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / REV_MS)
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    timers.current.push(window.setTimeout(lift, REV_MS + 150))

    return () => {
      cancelAnimationFrame(frame)
      timers.current.forEach(clearTimeout)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (phase === 'gone') return null

  return (
    <div
      className={cn('intro', phase === 'lifting' && 'is-lifting')}
      onClick={phase === 'revving' ? lift : undefined}
      aria-hidden="true"
    >
      <div className="intro-panel intro-panel-accent" />
      <div className="intro-panel intro-panel-black">
        <div className="intro-content">
          <LogoMark className="intro-logo h-24 w-auto md:h-28" />
          <div className="mt-10 w-56 md:w-72">
            <div className="h-[3px] w-full bg-white/15">
              <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
            <div className="mt-3 flex justify-between text-[11px] font-bold uppercase tracking-caps text-white/50">
              <span>Loading</span>
              <span className="tabular-nums text-white">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
