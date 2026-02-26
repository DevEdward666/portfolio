'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'About', href: '#background' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3 backdrop-blur-xl border-b border-surface-border'
            : 'py-6'
        )}
        style={{
          background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2.5"
            aria-label="Go to top"
          >
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #4F8EF7, #9B7FD4)' }}
            >
              <span className="font-display font-bold text-sm text-white">E</span>
            </div>
            <span className="font-display font-semibold text-text-primary text-sm tracking-tight">
              edward<span className="text-accent-blue">.</span>dev
            </span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNav(item.href)}
                  className="relative px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 group rounded-lg hover:bg-white/5"
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-px bg-accent-blue group-hover:w-4 transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #4F8EF7, #6A7FD0)' }}
              aria-label="Open contact section"
            >
              <span>Let&#39;s Talk</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-surface-border hover:bg-white/5 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
                className="block w-4 h-px bg-text-primary"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1, width: mobileOpen ? 0 : 16 }}
                className="block h-px bg-text-primary"
                style={{ width: 16 }}
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
                className="block w-4 h-px bg-text-primary"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : -20 }}
        transition={{ duration: 0.25 }}
        className={cn(
          'fixed top-[72px] left-4 right-4 z-40 rounded-2xl border border-surface-border backdrop-blur-2xl overflow-hidden md:hidden',
          !mobileOpen && 'pointer-events-none'
        )}
        style={{ background: 'rgba(17,17,17,0.95)' }}
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        <ul className="p-4 flex flex-col gap-1" role="list">
          {navItems.map((item, i) => (
            <motion.li
              key={item.href}
              initial={false}
              animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -20 }}
              transition={{ delay: mobileOpen ? i * 0.05 : 0 }}
            >
              <button
                onClick={() => handleNav(item.href)}
                className="w-full text-left px-4 py-3 rounded-xl text-text-primary hover:bg-white/5 transition-colors font-medium"
              >
                {item.label}
              </button>
            </motion.li>
          ))}
          <motion.li
            initial={false}
            animate={{ opacity: mobileOpen ? 1 : 0 }}
            transition={{ delay: mobileOpen ? 0.2 : 0 }}
            className="mt-2 pt-2 border-t border-surface-border"
          >
            <button
              onClick={() => handleNav('#contact')}
              className="w-full py-3 rounded-xl text-white font-medium text-sm"
              style={{ background: 'linear-gradient(135deg, #4F8EF7, #6A7FD0)' }}
            >
              Let&#39;s Talk
            </button>
          </motion.li>
        </ul>
      </motion.div>
    </>
  )
}
