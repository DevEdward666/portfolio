'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

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
            <p className="eyebrow">Portfolio</p>
            <h2 className="heading-lg">Selected Projects</h2>
          </div>
          <p className="max-w-xs text-base text-mute">
            {projects.length} projects shipped — from side hustles to production systems.
          </p>
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

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col" aria-label={project.name}>
      {/* Visual panel */}
      <div className="hero-glow relative aspect-[4/3] overflow-hidden" aria-hidden="true">
        <div className="hero-stripe absolute inset-0" />
        <span
          className="absolute -bottom-6 left-4 select-none font-display font-extrabold leading-none text-white/10"
          style={{ fontSize: '11rem', fontStretch: '115%' }}
        >
          {project.name[0]}
        </span>

        {project.featured && (
          <span className="absolute left-0 top-0 bg-rosso px-4 py-2 text-[11px] font-bold uppercase tracking-caps text-white">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <h3 className="heading-md">{project.name}</h3>
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
