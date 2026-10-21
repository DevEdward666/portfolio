'use client'

import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/intro'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_#'

interface ScrambleTextProps {
  text: string
  /** When given, starts on this flag instead of on scroll into view */
  start?: boolean
  /** Seconds to wait after the start signal */
  delay?: number
  /** Milliseconds for the whole decode */
  duration?: number
}

/** Decodes text from random glyphs, left to right, like a terminal resolving output. */
export default function ScrambleText({ text, start, delay = 0, duration = 800 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const shouldStart = start ?? inView
  const [output, setOutput] = useState(text)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (!shouldStart) return
    if (prefersReducedMotion()) {
      setHidden(false)
      setOutput(text)
      return
    }

    let frame = 0
    const timeout = window.setTimeout(() => {
      setHidden(false)
      const begin = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - begin) / duration)
        const resolved = Math.floor(t * text.length)
        setOutput(
          text
            .split('')
            .map((char, i) =>
              i < resolved || char === ' ' ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            )
            .join('')
        )
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay * 1000)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [shouldStart, text, delay, duration])

  return (
    <span ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" style={{ opacity: hidden ? 0 : 1 }}>
        {output}
      </span>
    </span>
  )
}
