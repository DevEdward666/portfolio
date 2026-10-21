'use client'

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

export default function HeroSection({ user, experiences = [], projects = [] }: HeroSectionProps) {
  const displayName = user?.name ?? 'Edward Joseph Fernandez'
  const title = user?.title ?? 'Mid Software Developer'
  const bio =
    user?.bio ??
    'Crafting high-performance web applications with clean architecture and exceptional user experience.'

  const [firstName, ...rest] = displayName.split(' ')
  const lastNames = rest.join(' ')

  const yearsOfExperience = calculateYearsOfExperience(experiences)
  const companies = countUniqueCompanies(experiences)
  const projectsCount = projects.length

  const stats = [
    { value: `${yearsOfExperience}+`, label: 'Years of Experience' },
    { value: `${projectsCount}+`, label: 'Projects Shipped' },
    { value: companies, label: 'Companies' },
  ]

  const scrollTo = (selector: string) =>
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="surface-dark hero-glow relative flex min-h-screen flex-col overflow-hidden"
      aria-label="Hero section"
    >
      <div className="hero-stripe pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="page-width relative z-10 flex flex-1 flex-col justify-center pb-14 pt-32">
        <p className="hero-rise flex items-center gap-3 text-xs font-bold uppercase tracking-caps text-white/80">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rosso opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rosso" />
          </span>
          Available for new projects
        </p>

        <h1
          className="hero-rise heading-xl mt-8"
          style={{ animationDelay: '0.1s', fontSize: 'clamp(2.75rem, 8.6vw, 8rem)', lineHeight: 0.92 }}
        >
          <span className="block">{firstName}</span>
          <span className="block">{lastNames}</span>
        </h1>

        <div className="hero-rule mt-10 h-[4px] w-28 bg-rosso" aria-hidden="true" />

        <p
          className="hero-rise mt-8 font-display text-lg font-bold uppercase tracking-caps md:text-xl"
          style={{ animationDelay: '0.3s' }}
        >
          {title}
        </p>

        <p
          className="hero-rise mt-6 max-w-[62ch] text-base leading-relaxed text-white/70 md:text-lg"
          style={{ animationDelay: '0.4s' }}
        >
          {bio}
        </p>

        <div
          className="hero-rise mt-12 flex flex-wrap items-center gap-4"
          style={{ animationDelay: '0.5s' }}
        >
          <button onClick={() => scrollTo('#projects')} className="btn btn-red" aria-label="View my projects">
            View My Work
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="btn btn-outline-light"
            aria-label="Navigate to contact section"
          >
            Get in touch
          </button>

          <div className="flex items-center gap-6 sm:ml-4">
            {user?.githubUrl && (
              <a
                href={user.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-colors hover:text-rosso"
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
                className="text-white/70 transition-colors hover:text-rosso"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 border-t border-white/15 bg-black/40 backdrop-blur-sm">
        <dl className="page-width grid grid-cols-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col py-6 md:py-8 ${i > 0 ? 'border-l border-white/15 pl-5 md:pl-10' : ''}`}
            >
              <dt className="order-2 mt-1 text-[11px] font-semibold uppercase tracking-caps text-white/60 md:text-xs">
                {stat.label}
              </dt>
              <dd className="font-display text-3xl font-extrabold md:text-5xl" style={{ fontStretch: '110%' }}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
