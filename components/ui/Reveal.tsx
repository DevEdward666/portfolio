'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** up: fade and rise · mask: slide up from behind a clip · fade: opacity only */
  variant?: 'up' | 'mask' | 'fade'
  delay?: number
}

/** Plays its CSS entrance once the element scrolls into view (styles live in globals.css). */
export default function Reveal({ children, className, variant = 'up', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <div
      ref={ref}
      className={cn('reveal', `reveal-${variant}`, inView && 'is-in', className)}
      style={{ '--reveal-delay': `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
