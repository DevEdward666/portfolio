'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { formatYearRange } from '@/lib/utils'
import type { Education, Certification } from '@/types'

interface BackgroundSectionProps {
  education: Education[]
  certifications: Certification[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: i * 0.1 },
  }),
}

export default function BackgroundSection({ education, certifications }: BackgroundSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      ref={ref}
      id="background"
      className="relative py-28 md:py-36 overflow-hidden"
      aria-label="Background and Education"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="section-label mb-3">Background</p>
          <h2
            className="font-display font-bold text-text-primary"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            Education &{' '}
            <span className="gradient-text-blue">Credentials</span>
          </h2>
        </motion.div>

        {/* Education timeline */}
        <div className="mb-16">
          <div className="hidden md:block">
            {/* Desktop horizontal timeline */}
            <div className="relative">
              {/* Timeline line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="absolute top-7 left-0 right-0 h-px origin-left"
                style={{ background: 'linear-gradient(90deg, #4F8EF7, #9B7FD4, transparent)' }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-2 gap-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.id}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="relative pt-16"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute top-5 left-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #4F8EF7, #9B7FD4)', boxShadow: '0 0 12px rgba(79,142,247,0.4)' }}
                      aria-hidden="true"
                    >
                      <div className="w-2 h-2 rounded-full bg-background" />
                    </div>

                    <EducationCard edu={edu} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden relative pl-8">
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="absolute left-2 top-0 bottom-0 w-px origin-top"
              style={{ background: 'linear-gradient(180deg, #4F8EF7, #9B7FD4, transparent)' }}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-6">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[27px] top-6 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #4F8EF7, #9B7FD4)', boxShadow: '0 0 10px rgba(79,142,247,0.4)' }}
                    aria-hidden="true"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-background" />
                  </div>
                  <EducationCard edu={edu} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="font-display font-semibold text-xl text-text-primary mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Certifications
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  custom={i + 2}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  <CertificationCard cert={cert} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function EducationCard({ edu }: { edu: Education }) {
  return (
    <article className="glass-card rounded-2xl p-6 group">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(155,127,212,0.15))', border: '1px solid rgba(79,142,247,0.2)' }}
          aria-hidden="true"
        >
          <GraduationIcon />
        </div>
        <span className="font-mono text-xs text-accent-blue tracking-wider whitespace-nowrap">
          {formatYearRange(edu.startYear, edu.endYear, edu.current)}
        </span>
      </div>

      <h3 className="font-display font-semibold text-text-primary text-lg mb-1 group-hover:text-white transition-colors"
        style={{ fontFamily: "'Syne', sans-serif" }}>
        {edu.institution}
      </h3>
      <p className="text-text-secondary text-sm mb-1">{edu.degree}</p>
      <p className="text-accent-blue text-sm font-medium mb-3">{edu.field}</p>

      {edu.description && (
        <p className="text-text-secondary text-sm leading-relaxed mb-3">{edu.description}</p>
      )}

      {edu.gpa && (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono"
          style={{ background: 'rgba(79,142,247,0.1)', color: '#4F8EF7', border: '1px solid rgba(79,142,247,0.2)' }}>
          GPA: {edu.gpa}
        </div>
      )}
    </article>
  )
}

function CertificationCard({ cert }: { cert: Certification }) {
  const content = (
    <article className="glass-card rounded-xl p-5 group flex items-center gap-4 h-full">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'linear-gradient(135deg, rgba(155,127,212,0.2), rgba(79,142,247,0.2))', border: '1px solid rgba(155,127,212,0.25)' }}
        aria-hidden="true"
      >
        <CertIcon />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-text-primary group-hover:text-white transition-colors leading-tight mb-0.5">{cert.name}</p>
        <p className="text-xs text-text-tertiary">{cert.issuer} · {cert.year}</p>
      </div>
      {cert.credentialUrl && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-auto shrink-0 text-text-tertiary group-hover:text-accent-blue transition-colors" aria-hidden="true">
          <path d="M1 11L11 1M11 1H5M11 1v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </article>
  )

  if (cert.credentialUrl) {
    return (
      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${cert.name} credential`}>
        {content}
      </a>
    )
  }
  return content
}

function GraduationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

function CertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9B7FD4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}
