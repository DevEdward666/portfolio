'use client'

import { useState } from 'react'
import { cn, formatDateRange } from '@/lib/utils'
import type { Experience } from '@/types'
import Reveal from '@/components/ui/Reveal'
import ScrambleText from '@/components/ui/ScrambleText'

interface ExperienceSectionProps {
  experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id ?? null)

  return (
    <section id="experience" className="surface-dark section-pad" aria-label="Work Experience">
      <div className="page-width">
        <header className="mb-16 md:mb-20">
          <Reveal variant="fade">
            <p className="eyebrow">
              <ScrambleText text="Career" />
            </p>
          </Reveal>
          <Reveal variant="mask" delay={0.1}>
            <h2 className="heading-lg">Work Experience</h2>
          </Reveal>
        </header>

        <ul className="border-t border-white" role="list">
          {experiences.map((exp, i) => (
            <li key={exp.id} className="border-b border-line-dark">
              <Reveal delay={i * 0.1}>
                <ExperienceRow
                  exp={exp}
                  isExpanded={expandedId === exp.id}
                  onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ExperienceRow({
  exp,
  isExpanded,
  onToggle,
}: {
  exp: Experience
  isExpanded: boolean
  onToggle: () => void
}) {
  const panelId = `exp-${exp.id}`

  return (
    <article className="group relative">
      {/* Red line sweeps along the row on hover */}
      <span
        className="absolute inset-x-0 -bottom-px z-10 h-[2px] origin-left scale-x-0 bg-rosso transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-6 py-8 text-left md:py-10"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        aria-label={`${exp.role} at ${exp.company}`}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-xs font-semibold uppercase tracking-caps text-mute-dark">
              {formatDateRange(exp.startDate, exp.endDate, exp.current)}
            </p>
            {exp.current && (
              <span className="inline-flex items-center gap-2 bg-rosso px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                Current
              </span>
            )}
          </div>
          <h3 className="heading-md mt-3 transition-transform duration-300 group-hover:translate-x-2" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.25rem)' }}>
            {exp.role}
          </h3>
          <p className="mt-2 text-base font-semibold text-rosso">{exp.company}</p>
        </div>

        <span
          className="relative mt-2 flex h-11 w-11 shrink-0 items-center justify-center border border-white/40 transition-colors group-hover:border-rosso"
          aria-hidden="true"
        >
          <span className="absolute h-[2px] w-4 bg-white" />
          <span
            className={cn(
              'absolute h-4 w-[2px] bg-white transition-transform duration-300',
              isExpanded && 'rotate-90'
            )}
          />
        </span>
      </button>

      <div
        id={panelId}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="grid gap-10 pb-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
            <div>
              <p className="max-w-[62ch] text-base leading-relaxed text-white/75">{exp.description}</p>

              <h4 className="mb-4 mt-10 text-xs font-bold uppercase tracking-caps">Key Achievements</h4>
              <ul className="space-y-3" role="list">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-4 text-base text-white/75">
                    <span className="mt-[0.7em] h-[2px] w-4 shrink-0 bg-rosso" aria-hidden="true" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-caps">Tech Stack</h4>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                {exp.techStack.map((tech) => (
                  <span key={tech} className="tag border-white/30 text-white" role="listitem">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
