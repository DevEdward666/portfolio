'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'
import Reveal from '@/components/ui/Reveal'
import ScrambleText from '@/components/ui/ScrambleText'

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<string>('All')

  const allTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))]
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.tags.includes(filter))

  return (
    <section id="projects" className="surface-light section-pad" aria-label="Projects">
      <div className="page-width">
        <header className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal variant="fade">
              <p className="eyebrow">
                <ScrambleText text="Portfolio" />
              </p>
            </Reveal>
            <Reveal variant="mask" delay={0.1}>
              <h2 className="heading-lg">Selected Projects</h2>
            </Reveal>
          </div>
          <Reveal variant="fade" delay={0.3}>
            <p className="max-w-xs text-base text-mute">
              {projects.length} projects shipped — from side hustles to production systems.
            </p>
          </Reveal>
        </header>

        {/* Filter tabs */}
        <div
          className="mb-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-line"
          role="group"
          aria-label="Filter projects by tag"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={cn(
                '-mb-px border-b-[3px] pb-3 text-[13px] font-bold uppercase tracking-caps transition-colors',
                filter === tag
                  ? 'border-rosso text-ink'
                  : 'border-transparent text-mute hover:text-ink'
              )}
              aria-pressed={filter === tag}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Keyed by filter so the cards deal in again whenever the filter changes */}
        <div key={filter} className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.12} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col" aria-label={project.name}>
      {/* Visual panel */}
      <div className="hero-glow relative aspect-[4/3] overflow-hidden" aria-hidden="true">
        <div className="hero-stripe absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110" />
        <span
          className="absolute -bottom-6 left-4 select-none font-display font-extrabold leading-none text-white/10 transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:translate-x-2 group-hover:text-rosso/40"
          style={{ fontSize: '11rem', fontStretch: '115%' }}
        >
          {project.name[0]}
        </span>

        {project.featured && (
          <span className="absolute left-0 top-0 bg-rosso px-4 py-2 text-[11px] font-bold uppercase tracking-caps text-white">
            Featured
          </span>
        )}

        <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-rosso transition-transform duration-500 group-hover:scale-x-100" />
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <h3 className="heading-md transition-colors duration-300 group-hover:text-rosso">{project.name}</h3>
        <p className="mt-3 flex-1 text-base leading-relaxed text-mute">{project.description}</p>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2" role="list" aria-label="Project tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag border-rosso text-rosso" role="listitem">
              {tag}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5" role="list" aria-label="Technologies used">
          {project.techStack.slice(0, 5).map((tech) => (
            <span key={tech} className="tag border-line text-mute" role="listitem">
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="tag border-line text-mute">+{project.techStack.length - 5}</span>
          )}
        </div>

        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-6 flex gap-8">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line"
                aria-label={`GitHub repository for ${project.name}`}
              >
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-line"
                aria-label={`Live demo for ${project.name}`}
              >
                Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
