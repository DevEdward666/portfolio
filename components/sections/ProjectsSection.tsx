'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import type { Project } from '@/types'

interface ProjectsSectionProps {
  projects: Project[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.08 },
  }),
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [filter, setFilter] = useState<string>('All')

  // Gather all unique tags
  const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))]

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter))

  return (
    <section
      ref={ref}
      id="projects"
      className="relative py-28 md:py-36 overflow-hidden"
      aria-label="Projects"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 30% 60%, rgba(79,142,247,0.05), transparent)',
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-label mb-3">Portfolio</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-display font-bold text-text-primary"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Selected{' '}
              <span className="gradient-text-blue">Projects</span>
            </h2>
            <p className="text-text-secondary text-sm max-w-xs">
              {projects.length} projects shipped — from side hustles to production systems.
            </p>
          </div>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Filter projects by tag"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className="px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200"
              style={{
                background: filter === tag ? 'linear-gradient(135deg, rgba(79,142,247,0.25), rgba(155,127,212,0.25))' : 'rgba(255,255,255,0.04)',
                border: filter === tag ? '1px solid rgba(79,142,247,0.4)' : '1px solid rgba(255,255,255,0.08)',
                color: filter === tag ? '#4F8EF7' : '#8E8E98',
              }}
              aria-pressed={filter === tag}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              layout
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="h-full"
      aria-label={project.name}
    >
      <article
        className="glass-card rounded-2xl overflow-hidden flex flex-col h-full"
        style={{
          boxShadow: hovered
            ? '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(79,142,247,0.12), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* Project image / placeholder */}
        <div
          className="relative h-44 overflow-hidden"
          style={{
            background: getProjectGradient(project.name),
          }}
          aria-hidden="true"
        >
          {/* Decorative pattern */}
          <div className="absolute inset-0 bg-dots opacity-20" />

          {/* Project initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display font-bold text-6xl text-white/10 select-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {project.name[0]}
            </span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono"
              style={{ background: 'rgba(79,142,247,0.25)', border: '1px solid rgba(79,142,247,0.4)', color: '#4F8EF7' }}>
              Featured
            </div>
          )}

          {/* Links */}
          <div className="absolute top-3 right-3 flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)' }}
                aria-label={`GitHub repository for ${project.name}`}
              >
                <GithubIcon />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
                style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.15)' }}
                aria-label={`Live demo for ${project.name}`}
              >
                <ExternalLinkIcon />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3
            className="font-display font-semibold text-text-primary text-lg mb-2 group-hover:text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {project.name}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4" role="list" aria-label="Project tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill" role="listitem">{tag}</span>
            ))}
          </div>

          {/* Tech stack */}
          <div className="pt-4 border-t border-surface-border">
            <div className="flex flex-wrap gap-1.5" role="list" aria-label="Technologies used">
              {project.techStack.slice(0, 5).map((tech) => (
                <span key={tech} className="tech-badge" role="listitem">{tech}</span>
              ))}
              {project.techStack.length > 5 && (
                <span className="tech-badge">+{project.techStack.length - 5}</span>
              )}
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  )
}

function getProjectGradient(name: string): string {
  const gradients = [
    'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F2744 100%)',
    'linear-gradient(135deg, #13111C 0%, #1E1535 50%, #2D1460 100%)',
    'linear-gradient(135deg, #0A1628 0%, #0F2744 50%, #133050 100%)',
    'linear-gradient(135deg, #0D1F0D 0%, #142414 50%, #1A3A1A 100%)',
    'linear-gradient(135deg, #1A0A28 0%, #280F3C 50%, #1A1050 100%)',
    'linear-gradient(135deg, #1A1200 0%, #2C1F00 50%, #1A1000 100%)',
  ]
  const index = name.charCodeAt(0) % gradients.length
  return gradients[index]
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="rgba(255,255,255,0.8)" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 11L11 1M11 1H5M11 1v6" />
    </svg>
  )
}
