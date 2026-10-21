'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'

const navItems = [
  { label: 'About', href: '#background' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
          scrolled || mobileOpen
            ? 'border-line-dark bg-ink'
            : 'border-white/10 bg-gradient-to-b from-black/60 to-transparent'
        )}
      >
        <nav
          className="page-width flex h-[76px] items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          <button
            onClick={() => {
              setMobileOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="text-left"
            aria-label="Edward Joseph Fernandez — go to top"
          >
            <Logo />
          </button>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-10 md:flex" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNav(item.href)}
                  className="group relative py-2 text-[13px] font-bold uppercase tracking-caps text-white"
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNav('#contact')
              }}
              className="btn btn-primary hidden !min-h-[44px] !px-6 md:inline-flex"
              aria-label="Open contact section"
            >
              Let&#39;s Talk
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  'block h-[2px] w-6 bg-white transition-transform duration-300',
                  mobileOpen && 'translate-y-[8px] rotate-45'
                )}
              />
              <span
                className={cn(
                  'block h-[2px] w-6 bg-white transition-opacity duration-200',
                  mobileOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block h-[2px] w-6 bg-white transition-transform duration-300',
                  mobileOpen && '-translate-y-[8px] -rotate-45'
                )}
              />
            </button>
          </div>
        </nav>

        {/* Scroll progress, like a rev counter across the top of the page */}
        <motion.div
          className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-accent"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile menu: full-screen panel */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-ink pt-[76px] transition-opacity duration-300 md:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        role="dialog"
        aria-label="Mobile navigation menu"
        aria-hidden={!mobileOpen}
      >
        <ul className="page-width flex flex-col pt-6" role="list">
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-line-dark">
              <button
                onClick={() => handleNav(item.href)}
                className="flex w-full items-center justify-between py-5 text-left font-display text-3xl font-extrabold uppercase text-white"
                tabIndex={mobileOpen ? 0 : -1}
              >
                {item.label}
                <span className="h-[3px] w-6 bg-accent" aria-hidden="true" />
              </button>
            </li>
          ))}
          <li className="pt-8">
            <button
              onClick={() => handleNav('#contact')}
              className="btn btn-primary w-full"
              tabIndex={mobileOpen ? 0 : -1}
            >
              Let&#39;s Talk
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}
