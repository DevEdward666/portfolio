'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { calculateYearsOfExperience, countUniqueCompanies } from '@/lib/utils'

interface Experience {
  startDate: string | Date
  endDate: string | Date | null
  current: boolean
  company: string
}

interface Project {
  id: string
}

interface HeroSectionProps {
  user: {
    name: string
    title: string
    bio: string
    githubUrl?: string | null
    linkedinUrl?: string | null
  } | null
  experiences?: Experience[]
  projects?: Project[]
}



const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
}


export default function HeroSection({ user, experiences = [], projects = [] }: HeroSectionProps) {
  
const name = (user?.name ?? 'Edward Joseph Fernandez').split(' ')
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const displayName = user?.name ?? 'Edward Joseph Fernandez'
  const title = user?.title ?? 'Mid Software Developer'
  const bio = user?.bio ?? 'Crafting high-performance web applications with clean architecture and exceptional user experience.'

  // Calculate dynamic stats
  const yearsOfExperience = calculateYearsOfExperience(experiences)
  const companies = countUniqueCompanies(experiences)
  const projectsCount = projects.length


  const scrollToWork = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
        {/* Dot grid */}
        <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />

        {/* Gradient mesh orbs */}
        <motion.div
          className="glow-orb"
          style={{
            width: '60vw',
            height: '60vw',
            maxWidth: 800,
            maxHeight: 800,
            background: 'radial-gradient(circle, #4F8EF7, transparent)',
            top: '-20%',
            left: '-10%',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <motion.div
          className="glow-orb"
          style={{
            width: '50vw',
            height: '50vw',
            maxWidth: 600,
            maxHeight: 600,
            background: 'radial-gradient(circle, #9B7FD4, transparent)',
            bottom: '-10%',
            right: '-10%',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          aria-hidden="true"
        />
      </div>

      {/* Parallax content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 w-full"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-start mb-10"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-surface-border backdrop-blur-md"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: '#4ade80' }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: '#4ade80' }}
              />
            </span>
            <span className="text-xs font-mono text-text-secondary tracking-wider uppercase">
              Available for new projects
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-8"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display leading-none tracking-tight"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              lineHeight: '0.95',
              letterSpacing: '-0.04em',
            }}
          >
            <span className="block text-text-primary">{displayName.split(' ')[0]}</span>
            <span className="block gradient-text-blue">{displayName.split(' ').slice(1).join(' ')}</span>
          </motion.h1>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #4F8EF7, transparent)' }} />
            <p className="font-mono text-sm tracking-[0.15em] uppercase text-accent-blue">
              {title}
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-text-secondary leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
          >
            {bio}
          </motion.p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center gap-4 mb-16"
        >
          <button
            onClick={scrollToWork}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #4F8EF7 0%, #7B6BD4 100%)' }}
            aria-label="View my projects"
          >
            <span className="relative z-10">View My Work</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10 group-hover:translate-x-1 transition-transform" aria-hidden="true">
              <path d="M2.5 7h9M7.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Shine effect */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>

          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-medium text-sm text-text-primary border border-surface-border hover:border-white/20 hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Navigate to contact section"
          >
            Get in touch
          </button>

          {/* Social links */}
          <div className="flex items-center gap-3 ml-1">
            {user?.githubUrl && (
              <a
                href={user.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-border text-text-secondary hover:text-text-primary hover:bg-white/5 hover:border-white/20 transition-all duration-200"
                aria-label="GitHub profile"
              >
                <GithubIcon />
              </a>
            )}
            {user?.linkedinUrl && (
              <a
                href={user.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-surface-border text-text-secondary hover:text-text-primary hover:bg-white/5 hover:border-white/20 transition-all duration-200"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon />
              </a>
            )}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-wrap gap-8 md:gap-12"
        >
          {[
            { value: `${yearsOfExperience}+`, label: 'Years of Experience' },
            { value: `${projectsCount}+`, label: 'Projects Shipped' },
            { value: companies, label: 'Companies' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span
                className="font-display font-bold text-text-primary"
                style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
              >
                {stat.value}
              </span>
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-text-tertiary">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs font-mono tracking-widest text-text-tertiary uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(79,142,247,0.5), transparent)' }}
        />
      </motion.div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
