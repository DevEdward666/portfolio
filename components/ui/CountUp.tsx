'use client'

import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '@/lib/intro'

interface CountUpProps {
  value: number
  suffix?: string
  start: boolean
  /** Seconds to wait after the start signal */
  delay?: number
  duration?: number
}

/** Counts from zero to `value` with an ease-out, like a gauge needle settling. */
export default function CountUp({ value, suffix = '', start, delay = 0, duration = 1400 }: CountUpProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!start) return
    if (prefersReducedMotion()) {
      setCurrent(value)
      return
    }

    let frame = 0
    const timeout = window.setTimeout(() => {
      const begin = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - begin) / duration)
        setCurrent(Math.round((1 - Math.pow(1 - t, 4)) * value))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay * 1000)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [start, value, delay, duration])

  return (
    <span className="tabular-nums">
      {current}
      {suffix}
    </span>
  )
}
