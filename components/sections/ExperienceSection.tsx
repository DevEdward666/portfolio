'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { formatDateRange } from '@/lib/utils'
import type { Experience } from '@/types'

interface ExperienceSectionProps {
  experiences: Experience[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.12 },
  }),
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [expandedId, setExpandedId] = useState<string | null>(
    experiences[0]?.id ?? null
  )

  return (
    <section
      ref={ref}
      id="experience"
      className="relative py-28 md:py-36 overflow-hidden"
      aria-label="Work Experience"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 100% 50%, rgba(155,127,212,0.06), transparent)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="section-label mb-3">Career</p>
          <h2
            className="font-display font-bold text-text-primary"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            Work{' '}
            <span className="gradient-text-blue">Experience</span>
          </h2>
        </motion.div>

        {/* Experience cards */}
        <div className="flex flex-col gap-4" role="list">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              role="listitem"
            >
              <ExperienceCard
                exp={exp}
                isExpanded={expandedId === exp.id}
                onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({
  exp,
  isExpanded,
  onToggle,
}: {
  exp: Experience
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <article
      className="glass-card rounded-2xl overflow-hidden cursor-pointer"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      aria-expanded={isExpanded}
      aria-label={`${exp.role} at ${exp.company}`}
    >
      {/* Card header */}
      <div className="p-6 flex items-start gap-5">
        {/* Company avatar */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-display font-bold text-lg text-white"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: getCompanyGradient(exp.company),
          }}
          aria-hidden="true"
        >
          {exp.company[0]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold text-text-primary text-xl"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              {exp.role}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              {exp.current && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
                  style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" aria-hidden="true" />
                  Current
                </span>
              )}
              <span className="font-mono text-xs text-text-tertiary">
                {formatDateRange(exp.startDate, exp.endDate, exp.current)}
              </span>
            </div>
          </div>
          <p className="text-accent-blue font-medium text-sm">{exp.company}</p>
        </div>

        {/* Expand chevron */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-text-tertiary mt-1"
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      {/* Expanded content */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6 border-t border-surface-border pt-6 ml-[68px]">
          <p className="text-text-secondary text-sm leading-relaxed mb-6">{exp.description}</p>

          {/* Key achievements */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-text-tertiary mb-3">Key Achievements</h4>
            <ul className="space-y-2.5" role="list">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span
                    className="mt-2 w-1 h-1 rounded-full shrink-0"
                    style={{ background: '#4F8EF7' }}
                    aria-hidden="true"
                  />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-text-tertiary mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
              {exp.techStack.map((tech) => (
                <span key={tech} className="tech-badge" role="listitem">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  )
}

function getCompanyGradient(company: string): string {
  const gradients = [
    'linear-gradient(135deg, #0EA5E9, #2563EB)',
    'linear-gradient(135deg, #8B5CF6, #6366F1)',
    'linear-gradient(135deg, #F59E0B, #EF4444)',
    'linear-gradient(135deg, #10B981, #0EA5E9)',
    'linear-gradient(135deg, #EC4899, #8B5CF6)',
  ]
  const index = company.charCodeAt(0) % gradients.length
  return gradients[index]
}
